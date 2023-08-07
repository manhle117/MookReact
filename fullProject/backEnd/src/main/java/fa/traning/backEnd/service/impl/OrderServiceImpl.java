package fa.traning.backEnd.service.impl;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fa.traning.backEnd.model.Carts;
import fa.traning.backEnd.model.OrderDetails;
import fa.traning.backEnd.model.Orders;
import fa.traning.backEnd.model.Users;

import fa.traning.backEnd.reponsitory.CartRepository;

import fa.traning.backEnd.reponsitory.OrderDetailRepository;
import fa.traning.backEnd.reponsitory.OrderRepository;

import fa.traning.backEnd.reponsitory.UserRepository;
import fa.traning.backEnd.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {
	@Autowired
	UserRepository userRepo;
	@Autowired
	OrderRepository orderRepo;
	@Autowired
	CartRepository cartRepo;
	@Autowired
	OrderDetailRepository orderDetailRepo;
	public  boolean createNewOrder(int userId,double totalPayment) {
	    Optional<Users> optionalUser = userRepo.findById(userId);

	    if (optionalUser.isEmpty()) {
	      return false;
	    }

	    Users user = optionalUser.get();
	    // add to order
	    Orders order = Orders.builder()
	        .user(user)
	        .orderDate(new Date())
	        .totalAmount(totalPayment)
	        .build();
	    orderRepo.save(order);

	    // add to order details
	    List<Carts> carts = cartRepo.findAllByUser(user);
	    carts.forEach(cart ->
	    orderDetailRepo.save(
	            OrderDetails.builder()
	                .order(order)
	                .product(cart.getProduct())
	                .quantity(cart.getQuantity())
	                .build()
	        )
	    );

	    // remove from cart
	    carts.forEach(cartRepo::delete);

	    return true;
	  }
}
