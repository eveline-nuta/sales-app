package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Cashier;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cashier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CashierRepository extends JpaRepository<Cashier, Long> {

}
