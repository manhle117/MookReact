package fa.traning.backEnd.controller;

import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.comparator.Comparators;
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
import fa.traning.backEnd.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	@Autowired
	OrderRepository orderRepo;
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	ProductRepository productRepo;
	@Autowired
	OrderService orderService;
	@PostMapping("/{userId}/{totalPayment}")
	public ResponseEntity<Boolean> addNewOrder (@PathVariable int userId,@PathVariable double totalPayment) {
		boolean status = orderService.createNewOrder(userId,totalPayment);
		
		return ResponseEntity.ok().body(status);
	}
	@GetMapping("/{id}")
	public List<Orders> listOrders(@PathVariable int id){
		Users user = userRepo.findByUserId(id).get();
		
		return orderRepo.findAllByUser(user)
				.stream()
				.sorted((o1, o2) -> o2.getOrderId() - o1.getOrderId())
				.toList();
	}
}
