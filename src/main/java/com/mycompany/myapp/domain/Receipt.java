package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Receipt.
 */
@Entity
@Table(name = "receipt")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Receipt implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "receipt_number")
    private String receiptNumber;

    @Column(name = "jhi_date")
    private String date;

    @Column(name = "payment_amount")
    private String paymentAmount;

    @Column(name = "cashier_name")
    private String cashierName;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReceiptNumber() {
        return receiptNumber;
    }

    public Receipt receiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
        return this;
    }

    public void setReceiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
    }

    public String getDate() {
        return date;
    }

    public Receipt date(String date) {
        this.date = date;
        return this;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPaymentAmount() {
        return paymentAmount;
    }

    public Receipt paymentAmount(String paymentAmount) {
        this.paymentAmount = paymentAmount;
        return this;
    }

    public void setPaymentAmount(String paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public String getCashierName() {
        return cashierName;
    }

    public Receipt cashierName(String cashierName) {
        this.cashierName = cashierName;
        return this;
    }

    public void setCashierName(String cashierName) {
        this.cashierName = cashierName;
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
        Receipt receipt = (Receipt) o;
        if (receipt.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), receipt.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Receipt{" +
            "id=" + getId() +
            ", receiptNumber='" + getReceiptNumber() + "'" +
            ", date='" + getDate() + "'" +
            ", paymentAmount='" + getPaymentAmount() + "'" +
            ", cashierName='" + getCashierName() + "'" +
            "}";
    }
}
