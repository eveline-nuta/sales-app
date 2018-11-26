package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SalesApp;

import com.mycompany.myapp.domain.Receipt;
import com.mycompany.myapp.repository.ReceiptRepository;
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
 * Test class for the ReceiptResource REST controller.
 *
 * @see ReceiptResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SalesApp.class)
public class ReceiptResourceIntTest {

    private static final String DEFAULT_RECEIPT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_RECEIPT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_DATE = "AAAAAAAAAA";
    private static final String UPDATED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_PAYMENT_AMOUNT = "AAAAAAAAAA";
    private static final String UPDATED_PAYMENT_AMOUNT = "BBBBBBBBBB";

    private static final String DEFAULT_CASHIER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CASHIER_NAME = "BBBBBBBBBB";

    @Autowired
    private ReceiptRepository receiptRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReceiptMockMvc;

    private Receipt receipt;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReceiptResource receiptResource = new ReceiptResource(receiptRepository);
        this.restReceiptMockMvc = MockMvcBuilders.standaloneSetup(receiptResource)
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
    public static Receipt createEntity(EntityManager em) {
        Receipt receipt = new Receipt()
            .receiptNumber(DEFAULT_RECEIPT_NUMBER)
            .date(DEFAULT_DATE)
            .paymentAmount(DEFAULT_PAYMENT_AMOUNT)
            .cashierName(DEFAULT_CASHIER_NAME);
        return receipt;
    }

    @Before
    public void initTest() {
        receipt = createEntity(em);
    }

    @Test
    @Transactional
    public void createReceipt() throws Exception {
        int databaseSizeBeforeCreate = receiptRepository.findAll().size();

        // Create the Receipt
        restReceiptMockMvc.perform(post("/api/receipts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receipt)))
            .andExpect(status().isCreated());

        // Validate the Receipt in the database
        List<Receipt> receiptList = receiptRepository.findAll();
        assertThat(receiptList).hasSize(databaseSizeBeforeCreate + 1);
        Receipt testReceipt = receiptList.get(receiptList.size() - 1);
        assertThat(testReceipt.getReceiptNumber()).isEqualTo(DEFAULT_RECEIPT_NUMBER);
        assertThat(testReceipt.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testReceipt.getPaymentAmount()).isEqualTo(DEFAULT_PAYMENT_AMOUNT);
        assertThat(testReceipt.getCashierName()).isEqualTo(DEFAULT_CASHIER_NAME);
    }

    @Test
    @Transactional
    public void createReceiptWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = receiptRepository.findAll().size();

        // Create the Receipt with an existing ID
        receipt.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReceiptMockMvc.perform(post("/api/receipts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receipt)))
            .andExpect(status().isBadRequest());

        // Validate the Receipt in the database
        List<Receipt> receiptList = receiptRepository.findAll();
        assertThat(receiptList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReceipts() throws Exception {
        // Initialize the database
        receiptRepository.saveAndFlush(receipt);

        // Get all the receiptList
        restReceiptMockMvc.perform(get("/api/receipts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(receipt.getId().intValue())))
            .andExpect(jsonPath("$.[*].receiptNumber").value(hasItem(DEFAULT_RECEIPT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].paymentAmount").value(hasItem(DEFAULT_PAYMENT_AMOUNT.toString())))
            .andExpect(jsonPath("$.[*].cashierName").value(hasItem(DEFAULT_CASHIER_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getReceipt() throws Exception {
        // Initialize the database
        receiptRepository.saveAndFlush(receipt);

        // Get the receipt
        restReceiptMockMvc.perform(get("/api/receipts/{id}", receipt.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(receipt.getId().intValue()))
            .andExpect(jsonPath("$.receiptNumber").value(DEFAULT_RECEIPT_NUMBER.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.paymentAmount").value(DEFAULT_PAYMENT_AMOUNT.toString()))
            .andExpect(jsonPath("$.cashierName").value(DEFAULT_CASHIER_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReceipt() throws Exception {
        // Get the receipt
        restReceiptMockMvc.perform(get("/api/receipts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReceipt() throws Exception {
        // Initialize the database
        receiptRepository.saveAndFlush(receipt);

        int databaseSizeBeforeUpdate = receiptRepository.findAll().size();

        // Update the receipt
        Receipt updatedReceipt = receiptRepository.findById(receipt.getId()).get();
        // Disconnect from session so that the updates on updatedReceipt are not directly saved in db
        em.detach(updatedReceipt);
        updatedReceipt
            .receiptNumber(UPDATED_RECEIPT_NUMBER)
            .date(UPDATED_DATE)
            .paymentAmount(UPDATED_PAYMENT_AMOUNT)
            .cashierName(UPDATED_CASHIER_NAME);

        restReceiptMockMvc.perform(put("/api/receipts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReceipt)))
            .andExpect(status().isOk());

        // Validate the Receipt in the database
        List<Receipt> receiptList = receiptRepository.findAll();
        assertThat(receiptList).hasSize(databaseSizeBeforeUpdate);
        Receipt testReceipt = receiptList.get(receiptList.size() - 1);
        assertThat(testReceipt.getReceiptNumber()).isEqualTo(UPDATED_RECEIPT_NUMBER);
        assertThat(testReceipt.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testReceipt.getPaymentAmount()).isEqualTo(UPDATED_PAYMENT_AMOUNT);
        assertThat(testReceipt.getCashierName()).isEqualTo(UPDATED_CASHIER_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingReceipt() throws Exception {
        int databaseSizeBeforeUpdate = receiptRepository.findAll().size();

        // Create the Receipt

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReceiptMockMvc.perform(put("/api/receipts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receipt)))
            .andExpect(status().isBadRequest());

        // Validate the Receipt in the database
        List<Receipt> receiptList = receiptRepository.findAll();
        assertThat(receiptList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReceipt() throws Exception {
        // Initialize the database
        receiptRepository.saveAndFlush(receipt);

        int databaseSizeBeforeDelete = receiptRepository.findAll().size();

        // Get the receipt
        restReceiptMockMvc.perform(delete("/api/receipts/{id}", receipt.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Receipt> receiptList = receiptRepository.findAll();
        assertThat(receiptList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Receipt.class);
        Receipt receipt1 = new Receipt();
        receipt1.setId(1L);
        Receipt receipt2 = new Receipt();
        receipt2.setId(receipt1.getId());
        assertThat(receipt1).isEqualTo(receipt2);
        receipt2.setId(2L);
        assertThat(receipt1).isNotEqualTo(receipt2);
        receipt1.setId(null);
        assertThat(receipt1).isNotEqualTo(receipt2);
    }
}
