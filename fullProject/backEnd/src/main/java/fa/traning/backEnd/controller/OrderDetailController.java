package fa.traning.backEnd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fa.traning.backEnd.model.OrderDetails;
import fa.traning.backEnd.model.Orders;
import fa.traning.backEnd.model.Users;
import fa.traning.backEnd.reponsitory.OrderDetailRepository;
import fa.traning.backEnd.reponsitory.OrderRepository;
import fa.traning.backEnd.reponsitory.UserRepository;

@RestController
@RequestMapping("/api/orderDetails")
public class OrderDetailController {
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	OrderRepository orderRepo;
	@Autowired
	OrderDetailRepository orderDetailRepo;
	@GetMapping("/{id}")	
	public ResponseEntity<List<OrderDetails>> getOrderDetail(@PathVariable int id){
		Orders order = orderRepo.findByOrderId(id);
		List<OrderDetails> listOrderDetail = orderDetailRepo.findByOrder(order);
		return ResponseEntity.ok(listOrderDetail);
	}
	
	
}
