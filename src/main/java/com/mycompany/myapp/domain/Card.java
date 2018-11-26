package com.mycompany.myapp.domain;

public class Card
{
    public Card(String cardNumber, String pin, Double balance){
        this.cardNumber = cardNumber;
        this.pin = pin;
        this.balance = balance;
    }

    public  Card(){}
    private String pin;
    private String cardNumber;
    private Double balance;

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }


}
