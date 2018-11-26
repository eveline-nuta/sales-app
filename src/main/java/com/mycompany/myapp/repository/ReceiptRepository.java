package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Receipt;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Receipt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, Long> {

}
