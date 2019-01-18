package com.mycompany.myapp.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * ScannerControllerResource controller
 */
@RestController
@RequestMapping("/api/scanner-controller")
public class ScannerResource {

    private final Logger log = LoggerFactory.getLogger(ScannerResource.class);
    Random rand;

    List<String> productBarcodes;

    public ScannerResource() {
        rand = new Random();
        productBarcodes = new ArrayList<String>();
        productBarcodes.add("100000000001");
        productBarcodes.add("100000000002");
        productBarcodes.add("100000000003");
        productBarcodes.add("100000000004");
        productBarcodes.add("100000000005");
        productBarcodes.add("100000000006");
    }
    /**
    * GET scanItem
    */
    @GetMapping("/scan-item")
    public String scanItem()
    {
        return productBarcodes.get(rand.nextInt(productBarcodes.size()));
    }

}
