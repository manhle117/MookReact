package fa.traning.backEnd.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fa.traning.backEnd.model.OrderImport;
import fa.traning.backEnd.model.Orders;
import fa.traning.backEnd.model.Products;
import fa.traning.backEnd.model.Users;
import fa.traning.backEnd.reponsitory.OrderRepository;
import fa.traning.backEnd.reponsitory.ProductRepository;
import fa.traning.backEnd.reponsitory.UserRepository;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	@Autowired
	OrderRepository orderRepo;
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	ProductRepository productRepo;
	@PostMapping("/addOrder")
	public ResponseEntity<String> addNewOrder (@RequestBody OrderImport order) {
		System.out.println("order: "+order);
		Users user = userRepo.findById(order.getUserId()).get();
		Orders newOrder = new Orders();
		newOrder.setOrderDate(new Date());
		newOrder.setTotalAmount(order.getTotalAmount());
		newOrder.setUser(user);
		orderRepo.save(newOrder);
		return ResponseEntity.ok("success");
	}
	@GetMapping("/{id}")
	public List<Orders> listOrders(@PathVariable int id){
		Users user = userRepo.findByUserId(id).get();
		
		return orderRepo.findAllByUser(user);
	}
}
