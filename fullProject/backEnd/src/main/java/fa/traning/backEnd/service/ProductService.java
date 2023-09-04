package fa.traning.backEnd.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fa.traning.backEnd.model.Products;
import fa.traning.backEnd.reponsitory.ProductRepository;

@Service
public class ProductService {
	@Autowired
	ProductRepository productRepo;
	
	public List<Map<String,Object>> getTopSellerProducts(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return productRepo.getTopSellerProduct(pageable);
    }
}
