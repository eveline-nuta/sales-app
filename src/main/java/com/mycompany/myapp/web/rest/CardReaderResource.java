package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Card;
import com.mycompany.myapp.domain.Debit;
import com.mycompany.myapp.service.BankService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;

/**
 * CardReaderControllerResource controller
 */
@RestController
@RequestMapping("/api/card-reader-controller")
public class CardReaderResource {

    private BankService bankService;

    public CardReaderResource(){
        this.bankService=new BankService();
    }
    private final Logger log = LoggerFactory.getLogger(CardReaderResource.class);


    /**
     * GET getValidation
     */
    @GetMapping("/get-validation")
    public Boolean getValidation(String cardNumber,String pin)
    {
        return bankService.verifyCard(cardNumber, pin);
    }


    /**
     * POST debitCard
     */
    @PostMapping("/debit-card/{price}/{cardNumber}")
    public Debit debitCard(Double price, String cardNumber)
    {
        return bankService.debitCard(price, cardNumber);
    }

}
