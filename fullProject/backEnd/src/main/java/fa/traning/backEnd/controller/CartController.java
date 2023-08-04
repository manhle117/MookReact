package fa.traning.backEnd.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fa.traning.backEnd.model.CartImport;
import fa.traning.backEnd.model.Carts;
import fa.traning.backEnd.model.Products;
import fa.traning.backEnd.model.Users;
import fa.traning.backEnd.reponsitory.CartRepository;
import fa.traning.backEnd.reponsitory.ProductRepository;
import fa.traning.backEnd.reponsitory.UserRepository;

@RestController
@RequestMapping("/api/carts")
public class CartController {
	@Autowired
	CartRepository cartRepo;
	@Autowired
	UserRepository userRepo;
	@Autowired
	ProductRepository productRepo;

	@GetMapping("/{userId}")
	List<Carts> listCart(@PathVariable int userId) {
		Users user = userRepo.findById(userId).get();

		return cartRepo.findAllByUser(user);
	}

	@PostMapping("/addCartItem")
	public ResponseEntity<?> addCartItem(@RequestBody CartImport cartImport) {

		Products addedProduct = productRepo.findById(cartImport.getProductId()).get();
		Users user = userRepo.findById(cartImport.getUserId()).get();

		Optional<Carts> cartFind = cartRepo.findByUserAndProduct(user, addedProduct);

		Carts cart;
		if (cartFind.isPresent()) {
			cart = cartFind.get();
			cart.setQuantity(cart.getQuantity() + cartImport.getQuantity());
		} else {
			cart = new Carts();
			cart.setUser(user);
			cart.setProduct(addedProduct);
			cart.setQuantity(cartImport.getQuantity());
		}

		cartRepo.save(cart);
		return ResponseEntity.ok(cart);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteItem(@PathVariable int id){
		cartRepo.deleteById(id);
		return ResponseEntity.ok("deleted item");
		
	} 

}
