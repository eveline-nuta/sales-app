package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Product;
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

    public InventoryResource(ProductRepository productRepository) {
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
     * POST removeProductFromStock
     */

    @PostMapping("/update-stock/{id}/{amount}")
    public Boolean updateStock(@PathVariable Long id, @PathVariable Integer amount) {
        Optional<Product> repoResponse = productRepository.findById(id);
        if (repoResponse.isPresent()) {
            Product product = repoResponse.get();
            if (product.getStockItem().getNumberOfProducts() > amount) {
                product.getStockItem().setNumberOfProducts(product.getStockItem().getNumberOfProducts() - amount);
            } else {
                product.getStockItem().setNumberOfProducts(0);
            }
            productRepository.save(product);
            return true;
        }
        else {
            return false;
        }

    }

    @DeleteMapping("/remove-product/{id}")
    public String removeProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return "removed the Product from the Stock";
    }


}

