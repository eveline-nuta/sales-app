package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Debit.
 */
@Entity
@Table(name = "debit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Debit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "money_amount")
    private Double moneyAmount;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "account_balance")
    private Double accountBalance;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public Debit transactionId(String transactionId) {
        this.transactionId = transactionId;
        return this;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public Double getMoneyAmount() {
        return moneyAmount;
    }

    public Debit moneyAmount(Double moneyAmount) {
        this.moneyAmount = moneyAmount;
        return this;
    }

    public void setMoneyAmount(Double moneyAmount) {
        this.moneyAmount = moneyAmount;
    }

    public Boolean isStatus() {
        return status;
    }

    public Debit status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    public Double getAccountBalance() {
        return accountBalance;
    }

    //????
    public Debit accountBalance( Double accountBalance) {
        this.accountBalance = accountBalance;
        return this;
    }

    public void setAccountBalance(Double accountBalance) {
        this.accountBalance = accountBalance;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Debit debit = (Debit) o;
        if (debit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), debit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Debit{" +
            "id=" + getId() +
            ", transactionId='" + getTransactionId() + "'" +
            ", moneyAmount=" + getMoneyAmount() +
            ", status='" + isStatus() + "'" +
            ", new account balance='" + getAccountBalance() +
        "}";
    }

}
