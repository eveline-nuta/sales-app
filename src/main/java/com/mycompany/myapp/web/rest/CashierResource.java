package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Cashier;
import com.mycompany.myapp.repository.CashierRepository;
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
 * REST controller for managing Cashier.
 */
@RestController
@RequestMapping("/api")
public class CashierResource {

    private final Logger log = LoggerFactory.getLogger(CashierResource.class);

    private static final String ENTITY_NAME = "cashier";

    private CashierRepository cashierRepository;

    public CashierResource(CashierRepository cashierRepository) {
        this.cashierRepository = cashierRepository;
    }

    /**
     * POST  /cashiers : Create a new cashier.
     *
     * @param cashier the cashier to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cashier, or with status 400 (Bad Request) if the cashier has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cashiers")
    @Timed
    public ResponseEntity<Cashier> createCashier(@RequestBody Cashier cashier) throws URISyntaxException {
        log.debug("REST request to save Cashier : {}", cashier);
        if (cashier.getId() != null) {
            throw new BadRequestAlertException("A new cashier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cashier result = cashierRepository.save(cashier);
        return ResponseEntity.created(new URI("/api/cashiers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cashiers : Updates an existing cashier.
     *
     * @param cashier the cashier to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cashier,
     * or with status 400 (Bad Request) if the cashier is not valid,
     * or with status 500 (Internal Server Error) if the cashier couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cashiers")
    @Timed
    public ResponseEntity<Cashier> updateCashier(@RequestBody Cashier cashier) throws URISyntaxException {
        log.debug("REST request to update Cashier : {}", cashier);
        if (cashier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cashier result = cashierRepository.save(cashier);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cashier.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cashiers : get all the cashiers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cashiers in body
     */
    @GetMapping("/cashiers")
    @Timed
    public List<Cashier> getAllCashiers() {
        log.debug("REST request to get all Cashiers");
        return cashierRepository.findAll();
    }

    /**
     * GET  /cashiers/:id : get the "id" cashier.
     *
     * @param id the id of the cashier to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cashier, or with status 404 (Not Found)
     */
    @GetMapping("/cashiers/{id}")
    @Timed
    public ResponseEntity<Cashier> getCashier(@PathVariable Long id) {
        log.debug("REST request to get Cashier : {}", id);
        Optional<Cashier> cashier = cashierRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cashier);
    }

    /**
     * DELETE  /cashiers/:id : delete the "id" cashier.
     *
     * @param id the id of the cashier to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cashiers/{id}")
    @Timed
    public ResponseEntity<Void> deleteCashier(@PathVariable Long id) {
        log.debug("REST request to delete Cashier : {}", id);

        cashierRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
