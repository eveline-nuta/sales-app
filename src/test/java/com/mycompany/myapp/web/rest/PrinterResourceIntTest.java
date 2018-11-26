package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SalesApp;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the PrinterControllerResource REST controller.
 *
 * @see PrinterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SalesApp.class)
public class PrinterResourceIntTest {

    private MockMvc restMockMvc;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        PrinterResource printerResource = new PrinterResource();
        restMockMvc = MockMvcBuilders
            .standaloneSetup(printerResource)
            .build();
    }

    /**
    * Test printReceipt
    */
    @Test
    public void testPrintReceipt() throws Exception {
        restMockMvc.perform(post("/api/printer-controller/print-receipt"))
            .andExpect(status().isOk());
    }

}
