package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SalesApp;

import com.mycompany.myapp.domain.Debit;
import com.mycompany.myapp.repository.DebitRepository;
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
 * Test class for the DebitResource REST controller.
 *
 * @see DebitResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SalesApp.class)
public class DebitResourceIntTest {

    private static final String DEFAULT_TRANSACTION_ID = "AAAAAAAAAA";
    private static final String UPDATED_TRANSACTION_ID = "BBBBBBBBBB";

    private static final Double DEFAULT_MONEY_AMOUNT = 1D;
    private static final Double UPDATED_MONEY_AMOUNT = 2D;

    private static final Boolean DEFAULT_STATUS = false;
    private static final Boolean UPDATED_STATUS = true;

    @Autowired
    private DebitRepository debitRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDebitMockMvc;

    private Debit debit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DebitResource debitResource = new DebitResource(debitRepository);
        this.restDebitMockMvc = MockMvcBuilders.standaloneSetup(debitResource)
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
    public static Debit createEntity(EntityManager em) {
        Debit debit = new Debit()
            .transactionId(DEFAULT_TRANSACTION_ID)
            .moneyAmount(DEFAULT_MONEY_AMOUNT)
            .status(DEFAULT_STATUS);
        return debit;
    }

    @Before
    public void initTest() {
        debit = createEntity(em);
    }

    @Test
    @Transactional
    public void createDebit() throws Exception {
        int databaseSizeBeforeCreate = debitRepository.findAll().size();

        // Create the Debit
        restDebitMockMvc.perform(post("/api/debits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(debit)))
            .andExpect(status().isCreated());

        // Validate the Debit in the database
        List<Debit> debitList = debitRepository.findAll();
        assertThat(debitList).hasSize(databaseSizeBeforeCreate + 1);
        Debit testDebit = debitList.get(debitList.size() - 1);
        assertThat(testDebit.getTransactionId()).isEqualTo(DEFAULT_TRANSACTION_ID);
        assertThat(testDebit.getMoneyAmount()).isEqualTo(DEFAULT_MONEY_AMOUNT);
        assertThat(testDebit.isStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createDebitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = debitRepository.findAll().size();

        // Create the Debit with an existing ID
        debit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDebitMockMvc.perform(post("/api/debits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(debit)))
            .andExpect(status().isBadRequest());

        // Validate the Debit in the database
        List<Debit> debitList = debitRepository.findAll();
        assertThat(debitList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDebits() throws Exception {
        // Initialize the database
        debitRepository.saveAndFlush(debit);

        // Get all the debitList
        restDebitMockMvc.perform(get("/api/debits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(debit.getId().intValue())))
            .andExpect(jsonPath("$.[*].transactionId").value(hasItem(DEFAULT_TRANSACTION_ID.toString())))
            .andExpect(jsonPath("$.[*].moneyAmount").value(hasItem(DEFAULT_MONEY_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getDebit() throws Exception {
        // Initialize the database
        debitRepository.saveAndFlush(debit);

        // Get the debit
        restDebitMockMvc.perform(get("/api/debits/{id}", debit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(debit.getId().intValue()))
            .andExpect(jsonPath("$.transactionId").value(DEFAULT_TRANSACTION_ID.toString()))
            .andExpect(jsonPath("$.moneyAmount").value(DEFAULT_MONEY_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDebit() throws Exception {
        // Get the debit
        restDebitMockMvc.perform(get("/api/debits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDebit() throws Exception {
        // Initialize the database
        debitRepository.saveAndFlush(debit);

        int databaseSizeBeforeUpdate = debitRepository.findAll().size();

        // Update the debit
        Debit updatedDebit = debitRepository.findById(debit.getId()).get();
        // Disconnect from session so that the updates on updatedDebit are not directly saved in db
        em.detach(updatedDebit);
        updatedDebit
            .transactionId(UPDATED_TRANSACTION_ID)
            .moneyAmount(UPDATED_MONEY_AMOUNT)
            .status(UPDATED_STATUS);

        restDebitMockMvc.perform(put("/api/debits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDebit)))
            .andExpect(status().isOk());

        // Validate the Debit in the database
        List<Debit> debitList = debitRepository.findAll();
        assertThat(debitList).hasSize(databaseSizeBeforeUpdate);
        Debit testDebit = debitList.get(debitList.size() - 1);
        assertThat(testDebit.getTransactionId()).isEqualTo(UPDATED_TRANSACTION_ID);
        assertThat(testDebit.getMoneyAmount()).isEqualTo(UPDATED_MONEY_AMOUNT);
        assertThat(testDebit.isStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingDebit() throws Exception {
        int databaseSizeBeforeUpdate = debitRepository.findAll().size();

        // Create the Debit

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDebitMockMvc.perform(put("/api/debits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(debit)))
            .andExpect(status().isBadRequest());

        // Validate the Debit in the database
        List<Debit> debitList = debitRepository.findAll();
        assertThat(debitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDebit() throws Exception {
        // Initialize the database
        debitRepository.saveAndFlush(debit);

        int databaseSizeBeforeDelete = debitRepository.findAll().size();

        // Get the debit
        restDebitMockMvc.perform(delete("/api/debits/{id}", debit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Debit> debitList = debitRepository.findAll();
        assertThat(debitList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Debit.class);
        Debit debit1 = new Debit();
        debit1.setId(1L);
        Debit debit2 = new Debit();
        debit2.setId(debit1.getId());
        assertThat(debit1).isEqualTo(debit2);
        debit2.setId(2L);
        assertThat(debit1).isNotEqualTo(debit2);
        debit1.setId(null);
        assertThat(debit1).isNotEqualTo(debit2);
    }
}
