package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Debit;
import com.mycompany.myapp.repository.DebitRepository;
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
 * REST controller for managing Debit.
 */
@RestController
@RequestMapping("/api")
public class DebitResource {

    private final Logger log = LoggerFactory.getLogger(DebitResource.class);

    private static final String ENTITY_NAME = "debit";

    private DebitRepository debitRepository;

    public DebitResource(DebitRepository debitRepository) {
        this.debitRepository = debitRepository;
    }

    /**
     * POST  /debits : Create a new debit.
     *
     * @param debit the debit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new debit, or with status 400 (Bad Request) if the debit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/debits")
    @Timed
    public ResponseEntity<Debit> createDebit(@RequestBody Debit debit) throws URISyntaxException {
        log.debug("REST request to save Debit : {}", debit);
        if (debit.getId() != null) {
            throw new BadRequestAlertException("A new debit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Debit result = debitRepository.save(debit);
        return ResponseEntity.created(new URI("/api/debits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /debits : Updates an existing debit.
     *
     * @param debit the debit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated debit,
     * or with status 400 (Bad Request) if the debit is not valid,
     * or with status 500 (Internal Server Error) if the debit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/debits")
    @Timed
    public ResponseEntity<Debit> updateDebit(@RequestBody Debit debit) throws URISyntaxException {
        log.debug("REST request to update Debit : {}", debit);
        if (debit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Debit result = debitRepository.save(debit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, debit.getId().toString()))
            .body(result);
    }

    /**
     * GET  /debits : get all the debits.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of debits in body
     */
    @GetMapping("/debits")
    @Timed
    public List<Debit> getAllDebits() {
        log.debug("REST request to get all Debits");
        return debitRepository.findAll();
    }

    /**
     * GET  /debits/:id : get the "id" debit.
     *
     * @param id the id of the debit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the debit, or with status 404 (Not Found)
     */
    @GetMapping("/debits/{id}")
    @Timed
    public ResponseEntity<Debit> getDebit(@PathVariable Long id) {
        log.debug("REST request to get Debit : {}", id);
        Optional<Debit> debit = debitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(debit);
    }

    /**
     * DELETE  /debits/:id : delete the "id" debit.
     *
     * @param id the id of the debit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/debits/{id}")
    @Timed
    public ResponseEntity<Void> deleteDebit(@PathVariable Long id) {
        log.debug("REST request to delete Debit : {}", id);

        debitRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
