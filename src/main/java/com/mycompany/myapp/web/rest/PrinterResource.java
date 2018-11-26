package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Receipt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * PrinterControllerResource controller
 */
@RestController
@RequestMapping("/api/printer-controller")
public class PrinterResource {

    private final Logger log = LoggerFactory.getLogger(PrinterResource.class);

    /**
    * POST printReceipt
    */
    @PostMapping("/print-receipt")
    public String printReceipt(Receipt receipt)
    {
        String result="Receipt number: "+ receipt.getReceiptNumber()+ "     "
            +"Date: " +receipt.getDate()+"     "
            + "Total: " + receipt.getPaymentAmount()+"     "
            + "Cashier: " +receipt.getCashierName();
        return result;
    }

}
