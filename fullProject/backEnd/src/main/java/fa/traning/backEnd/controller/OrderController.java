package fa.traning.backEnd.controller;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.comparator.Comparators;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	@PostMapping("/{userId}")
	public ResponseEntity<Boolean> addNewOrder (@PathVariable int userId) {
		boolean status = orderService.createNewOrder(userId);
		
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
	@GetMapping("/")
	public List<Orders> listOrderAdmin(){
		return orderRepo.findAll().stream()
				.sorted((o1, o2) -> o2.getOrderId() - o1.getOrderId())
				.toList();
	} 
	
	//rule Confirm => {0:not confirm,1:confirm,2:cancel }
	
	@GetMapping("/notConfirm")
	public List<Orders> listNotConfirm(){
		List<Orders> listAllOrder = orderRepo.findAll();
		List<Orders> listNotConfirm = new ArrayList<>();
		
		for (Orders orders : listAllOrder) {
			if(orders.getStatus() == 0) {
				listNotConfirm.add(orders);
			}
		}
		return listNotConfirm.stream()
				.sorted((o1, o2) -> o2.getOrderId() - o1.getOrderId())
				.toList();
		
	}
	@GetMapping("/confirm")
	public List<Orders> listConfirm(){
		List<Orders> listAllOrder = orderRepo.findAll();
		List<Orders> listConfirm = new ArrayList<>();
		
		for (Orders orders : listAllOrder) {
			if(orders.getStatus() == 1) {
				listConfirm.add(orders);
			}
		}
		return listConfirm.stream()
				.sorted((o1, o2) -> o2.getOrderId() - o1.getOrderId())
				.toList();
		
	}
	@GetMapping("/cancelList")
	public List<Orders> listCancel(){
		List<Orders> listAllOrder = orderRepo.findAll();
		List<Orders> listCancel = new ArrayList<>();
		
		for (Orders orders : listAllOrder) {
			if(orders.getStatus() == 2) {
				listCancel.add(orders);
			}
		}
		return listCancel.stream()
				.sorted((o1, o2) -> o2.getOrderId() - o1.getOrderId())
				.toList();
		
	}
	@PutMapping("/cofirmOrder/{id}")
	public ResponseEntity<String> confirmOrder(@PathVariable int id){
		Orders order = orderRepo.findByOrderId(id);
		order.setStatus(1);
		orderRepo.save(order);
		return ResponseEntity.ok("confirm success");
	}
	@PutMapping("/cancelOrder/{id}")
	public ResponseEntity<String> cancelOrder(@PathVariable int id){
		Orders order = orderRepo.findByOrderId(id);
		order.setStatus(2);
		orderRepo.save(order);
		return ResponseEntity.ok("Cancel success");
	}
	
}
