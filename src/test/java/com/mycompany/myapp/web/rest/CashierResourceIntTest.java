package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SalesApp;

import com.mycompany.myapp.domain.Cashier;
import com.mycompany.myapp.repository.CashierRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CashierResource REST controller.
 *
 * @see CashierResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SalesApp.class)
public class CashierResourceIntTest {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private CashierRepository cashierRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCashierMockMvc;

    private Cashier cashier;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CashierResource cashierResource = new CashierResource(cashierRepository);
        this.restCashierMockMvc = MockMvcBuilders.standaloneSetup(cashierResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cashier createEntity(EntityManager em) {
        Cashier cashier = new Cashier()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL);
        return cashier;
    }

    @Before
    public void initTest() {
        cashier = createEntity(em);
    }

    @Test
    @Transactional
    public void createCashier() throws Exception {
        int databaseSizeBeforeCreate = cashierRepository.findAll().size();

        // Create the Cashier
        restCashierMockMvc.perform(post("/api/cashiers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashier)))
            .andExpect(status().isCreated());

        // Validate the Cashier in the database
        List<Cashier> cashierList = cashierRepository.findAll();
        assertThat(cashierList).hasSize(databaseSizeBeforeCreate + 1);
        Cashier testCashier = cashierList.get(cashierList.size() - 1);
        assertThat(testCashier.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testCashier.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testCashier.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createCashierWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cashierRepository.findAll().size();

        // Create the Cashier with an existing ID
        cashier.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCashierMockMvc.perform(post("/api/cashiers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashier)))
            .andExpect(status().isBadRequest());

        // Validate the Cashier in the database
        List<Cashier> cashierList = cashierRepository.findAll();
        assertThat(cashierList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCashiers() throws Exception {
        // Initialize the database
        cashierRepository.saveAndFlush(cashier);

        // Get all the cashierList
        restCashierMockMvc.perform(get("/api/cashiers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cashier.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }
    
    @Test
    @Transactional
    public void getCashier() throws Exception {
        // Initialize the database
        cashierRepository.saveAndFlush(cashier);

        // Get the cashier
        restCashierMockMvc.perform(get("/api/cashiers/{id}", cashier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cashier.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCashier() throws Exception {
        // Get the cashier
        restCashierMockMvc.perform(get("/api/cashiers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCashier() throws Exception {
        // Initialize the database
        cashierRepository.saveAndFlush(cashier);

        int databaseSizeBeforeUpdate = cashierRepository.findAll().size();

        // Update the cashier
        Cashier updatedCashier = cashierRepository.findById(cashier.getId()).get();
        // Disconnect from session so that the updates on updatedCashier are not directly saved in db
        em.detach(updatedCashier);
        updatedCashier
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL);

        restCashierMockMvc.perform(put("/api/cashiers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCashier)))
            .andExpect(status().isOk());

        // Validate the Cashier in the database
        List<Cashier> cashierList = cashierRepository.findAll();
        assertThat(cashierList).hasSize(databaseSizeBeforeUpdate);
        Cashier testCashier = cashierList.get(cashierList.size() - 1);
        assertThat(testCashier.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testCashier.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testCashier.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingCashier() throws Exception {
        int databaseSizeBeforeUpdate = cashierRepository.findAll().size();

        // Create the Cashier

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCashierMockMvc.perform(put("/api/cashiers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashier)))
            .andExpect(status().isBadRequest());

        // Validate the Cashier in the database
        List<Cashier> cashierList = cashierRepository.findAll();
        assertThat(cashierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCashier() throws Exception {
        // Initialize the database
        cashierRepository.saveAndFlush(cashier);

        int databaseSizeBeforeDelete = cashierRepository.findAll().size();

        // Get the cashier
        restCashierMockMvc.perform(delete("/api/cashiers/{id}", cashier.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cashier> cashierList = cashierRepository.findAll();
        assertThat(cashierList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cashier.class);
        Cashier cashier1 = new Cashier();
        cashier1.setId(1L);
        Cashier cashier2 = new Cashier();
        cashier2.setId(cashier1.getId());
        assertThat(cashier1).isEqualTo(cashier2);
        cashier2.setId(2L);
        assertThat(cashier1).isNotEqualTo(cashier2);
        cashier1.setId(null);
        assertThat(cashier1).isNotEqualTo(cashier2);
    }
}
