package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Card;
import com.mycompany.myapp.domain.Debit;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;


public class BankService
{
    Random random;
    List<Card> acceptedCards;

    public BankService()
    {
        this.random = new Random();
        generateAcceptedMockCards();
    }

     public Boolean verifyCard(String cardNumber, String pin)
    {

        for(Card item: acceptedCards)
        {
            if(item.getCardNumber().equals(cardNumber) && item.getPin().equals(pin))
            {
                return true;
            }
        }
        return false;

    }

    public Debit debitCard(Double price, Card card)
    {

        Debit debit = new Debit();

        if (card.getBalance() >= price)
        {
            card.setBalance(card.getBalance() - price);
            debit.setMoneyAmount(price);
            debit.setStatus(true);
            debit.setTransactionId(UUID.randomUUID().toString());
        }

        else
        {
            debit.setStatus(false);
            debit.setTransactionId(UUID.randomUUID().toString());
            debit.setMoneyAmount(0.0);
    }
        return debit;
    }

    public void generateAcceptedMockCards()
    {
        acceptedCards = new ArrayList<Card>();
        acceptedCards.add(new Card("700700700","0000",10000.0));
        acceptedCards.add(new Card("800800800","1234",20.0));
        acceptedCards.add(new Card("900900900", "1111", 0.0));
    }
}
