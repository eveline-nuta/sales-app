package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Receipt;
import com.mycompany.myapp.repository.ReceiptRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Receipt.
 */
@RestController
@RequestMapping("/api")
public class ReceiptResource {

    private final Logger log = LoggerFactory.getLogger(ReceiptResource.class);

    private static final String ENTITY_NAME = "receipt";

    private ReceiptRepository receiptRepository;

    public ReceiptResource(ReceiptRepository receiptRepository) {
        this.receiptRepository = receiptRepository;
    }

    /**
     * POST  /receipts : Create a new receipt.
     *
     * @param receipt the receipt to create
     * @return the ResponseEntity with status 201 (Created) and with body the new receipt, or with status 400 (Bad Request) if the receipt has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/receipts")
    @Timed
    public ResponseEntity<Receipt> createReceipt(@RequestBody Receipt receipt) throws URISyntaxException {
        log.debug("REST request to save Receipt : {}", receipt);
        if (receipt.getId() != null) {
            throw new BadRequestAlertException("A new receipt cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Receipt result = receiptRepository.save(receipt);
        return ResponseEntity.created(new URI("/api/receipts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /receipts : Updates an existing receipt.
     *
     * @param receipt the receipt to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated receipt,
     * or with status 400 (Bad Request) if the receipt is not valid,
     * or with status 500 (Internal Server Error) if the receipt couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/receipts")
    @Timed
    public ResponseEntity<Receipt> updateReceipt(@RequestBody Receipt receipt) throws URISyntaxException {
        log.debug("REST request to update Receipt : {}", receipt);
        if (receipt.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Receipt result = receiptRepository.save(receipt);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, receipt.getId().toString()))
            .body(result);
    }

    /**
     * GET  /receipts : get all the receipts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of receipts in body
     */
    @GetMapping("/receipts")
    @Timed
    public List<Receipt> getAllReceipts() {
        log.debug("REST request to get all Receipts");
        return receiptRepository.findAll();
    }

    /**
     * GET  /receipts/:id : get the "id" receipt.
     *
     * @param id the id of the receipt to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the receipt, or with status 404 (Not Found)
     */
    @GetMapping("/receipts/{id}")
    @Timed
    public ResponseEntity<Receipt> getReceipt(@PathVariable Long id) {
        log.debug("REST request to get Receipt : {}", id);
        Optional<Receipt> receipt = receiptRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(receipt);
    }

    /**
     * DELETE  /receipts/:id : delete the "id" receipt.
     *
     * @param id the id of the receipt to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/receipts/{id}")
    @Timed
    public ResponseEntity<Void> deleteReceipt(@PathVariable Long id) {
        log.debug("REST request to delete Receipt : {}", id);

        receiptRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
