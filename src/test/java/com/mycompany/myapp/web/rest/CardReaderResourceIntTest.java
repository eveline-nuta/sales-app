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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the CardReaderControllerResource REST controller.
 *
 * @see CardReaderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SalesApp.class)
public class CardReaderResourceIntTest {

    private MockMvc restMockMvc;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        CardReaderResource cardReaderResource = new CardReaderResource();
        restMockMvc = MockMvcBuilders
            .standaloneSetup(cardReaderResource)
            .build();
    }

    /**
    * Test scanCard
    */
    @Test
    public void testScanCard() throws Exception {
        restMockMvc.perform(get("/api/card-reader-controller/scan-card"))
            .andExpect(status().isOk());
    }
    /**
    * Test enterPin
    */
    @Test
    public void testEnterPin() throws Exception {
        restMockMvc.perform(post("/api/card-reader-controller/enter-pin"))
            .andExpect(status().isOk());
    }

}
