package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A StockItem.
 */
@Entity
@Table(name = "stock_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class StockItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "number_of_products")
    private Integer numberOfProducts;



    @OneToMany(mappedBy = "stockItem")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> products = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumberOfProducts() {
        return numberOfProducts;
    }

    public StockItem numberOfProducts(Integer numberOfProducts) {
        this.numberOfProducts = numberOfProducts;
        return this;
    }

    public void setNumberOfProducts(Integer numberOfProducts) {
        this.numberOfProducts = numberOfProducts;
    }




    public Set<Product> getProducts() {
        return products;
    }

    public StockItem products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public StockItem addProduct(Product product) {
        this.products.add(product);
        product.setStockItem(this);
        return this;
    }

    public StockItem removeProduct(Product product) {
        this.products.remove(product);
        product.setStockItem(null);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        StockItem stockItem = (StockItem) o;
        if (stockItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stockItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StockItem{" +
            "id=" + getId() +
            ", numberOfProducts=" + getNumberOfProducts() +
            "}";
    }
}
