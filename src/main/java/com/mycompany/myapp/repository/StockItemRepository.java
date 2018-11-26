package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.StockItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StockItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StockItemRepository extends JpaRepository<StockItem, Long> {

}
