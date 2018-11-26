package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Debit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Debit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DebitRepository extends JpaRepository<Debit, Long> {

}
