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


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the ScannerControllerResource REST controller.
 *
 * @see ScannerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SalesApp.class)
public class ScannerResourceIntTest {

    private MockMvc restMockMvc;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        ScannerResource scannerResource = new ScannerResource();
        restMockMvc = MockMvcBuilders
            .standaloneSetup(scannerResource)
            .build();
    }

    /**
    * Test scanItem
    */
    @Test
    public void testScanItem() throws Exception {
        restMockMvc.perform(get("/api/scanner-controller/scan-item"))
            .andExpect(status().isOk());
    }

}
