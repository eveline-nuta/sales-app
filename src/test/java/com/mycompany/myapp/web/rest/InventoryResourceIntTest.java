package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SalesApp;
import com.mycompany.myapp.domain.StockItem;
import com.mycompany.myapp.repository.ProductRepository;
import com.mycompany.myapp.repository.StockItemRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the InventoryControllerResource REST controller.
 *
 * @see InventoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SalesApp.class)
public class InventoryResourceIntTest {

    private MockMvc restMockMvc;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private StockItemRepository stockItemRepository;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        InventoryResource inventoryResource = new InventoryResource(productRepository, stockItemRepository);
        restMockMvc = MockMvcBuilders
            .standaloneSetup(inventoryResource)
            .build();
    }

    /**
    * Test getProduct
    */
    @Test
    public void testGetProduct() throws Exception {
        restMockMvc.perform(get("/api/inventory-controller/get-product"))
            .andExpect(status().isOk());
    }

}
