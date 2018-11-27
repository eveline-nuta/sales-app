package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.domain.StockItem;
import com.mycompany.myapp.repository.ProductRepository;
import com.mycompany.myapp.repository.StockItemRepository;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


/**
 * InventoryControllerResource controller
 */
@RestController
@RequestMapping("/api/inventory-controller")
public class InventoryResource {

    private ProductRepository productRepository;

    private StockItemRepository stockItemRepository;

    public InventoryResource(ProductRepository productRepository, StockItemRepository stockItemRepository) {

        this.stockItemRepository = stockItemRepository;
        this.productRepository = productRepository;
    }


    private final Logger log = LoggerFactory.getLogger(InventoryResource.class);

    /**
     * GET getProduct
     */
    @GetMapping("/get-product/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(product);
    }

    @GetMapping("/verify-item/{id}")
    public Boolean verifyItem(Long id) {

        if(!productRepository.findById(id).isPresent())
            return false;
        else
            return true;
    }

    /**
     * GET verifyProductStock
     */
    @GetMapping("/verify-product-stock/{id}")
    public Boolean verifyProductStock(Long id) {

        Optional<Product> repoResponse = productRepository.findById(id);
        if(repoResponse.isPresent()) {
            Product product = repoResponse.get();
            if(product.getStockItem().getNumberOfProducts() > 0)
                return true;
            return false;
        }
        return false;
    }

    /**
     * POST updateStock
     */

    @PostMapping("/update-stock/{id}/{amount}")
    public Boolean updateStock(@PathVariable Long id, @PathVariable Integer amount) {
        Optional<Product> repoResponse = productRepository.findById(id);
        if (repoResponse.isPresent()) {
            Product product = repoResponse.get();
            Optional<StockItem> repoStackResponse = stockItemRepository.findById(product.getStockItem().getId());
            if(repoStackResponse.isPresent()) {
                StockItem stockItem = repoStackResponse.get();
                if (stockItem.getNumberOfProducts() > amount) {
                    stockItem.setNumberOfProducts(product.getStockItem().getNumberOfProducts() - amount);
                } else {
                    stockItem.setNumberOfProducts(0);
                }
                stockItemRepository.save(stockItem);
                return true;
            }
        }
        return false;
    }

    @DeleteMapping("/remove-product/{id}")
    public Boolean removeProduct(@PathVariable Long id)
    {
        if(!productRepository.findById(id).isPresent())
        {
            return false;
        }

        productRepository.deleteById(id);
        return true;
      }


}

