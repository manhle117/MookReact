package fa.traning.backEnd.service.impl;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fa.traning.backEnd.model.Carts;
import fa.traning.backEnd.model.OrderDetails;
import fa.traning.backEnd.model.Orders;
import fa.traning.backEnd.model.SellDataDTO;
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

	public boolean createNewOrder(int userId) {
		Optional<Users> optionalUser = userRepo.findById(userId);

		double totalAmount = 0;
		if (optionalUser.isEmpty()) {
			return false;
		}

		Users user = optionalUser.get();
		List<Carts> carts = cartRepo.findAllByUser(user);

		for (Carts cart : carts) {
			totalAmount += cart.priceItemCart();
		}
		// add to order
		Orders order = Orders.builder().user(user).orderDate(new Date()).totalAmount(totalAmount).build();
		orderRepo.save(order);

		// add to order details

		carts.forEach(cart -> orderDetailRepo.save(
				OrderDetails.builder().order(order).product(cart.getProduct()).quantity(cart.getQuantity()).build()));

		// remove from cart
		carts.forEach(cartRepo::delete);

		return true;
	}

	public List<SellDataDTO> getSalesDataForMonth(int year, int month) {
		List<SellDataDTO> salesData = new ArrayList<>();
		int daysInMonth = YearMonth.of(year, month).lengthOfMonth();
		double amount = 0;
		for (int day = 1; day <= daysInMonth; day++) {
			salesData.add(new SellDataDTO(day,amount));
		}
		List<Map<String, Object>> mapDay = orderRepo.calculateTotalSalesForDay(year, month);
		for (Map<String, Object> map : mapDay) {
			double tongTien = (double) map.get("tongTien");
			int ngay = (int) map.get("ngay");
			double oldTongTien = salesData.get(ngay -1 ).getAmount() + tongTien;
			salesData.get(ngay -1).setAmount(oldTongTien);
		}

		return salesData;
	}
	public List<Map<String,Object>> getTop5User(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return orderRepo.getTop5User(pageable);
    }
}
