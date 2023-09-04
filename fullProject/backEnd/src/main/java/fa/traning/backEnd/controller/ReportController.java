package fa.traning.backEnd.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fa.traning.backEnd.model.SellDataDTO;
import fa.traning.backEnd.model.TopUser;
import fa.traning.backEnd.reponsitory.OrderRepository;
import fa.traning.backEnd.service.impl.OrderServiceImpl;

@RestController
@RequestMapping("/api/report")
public class ReportController {
	@Autowired
	private OrderServiceImpl orderServiceImpl;
	@Autowired
	private OrderRepository orderRepo;
	@GetMapping("/{year}/{month}")
	public ResponseEntity<List<SellDataDTO>> getSalesData(@PathVariable int year, @PathVariable int month) {
		List<SellDataDTO> salesData = orderServiceImpl.getSalesDataForMonth(year, month);
		return ResponseEntity.ok(salesData);
	}
	
	@GetMapping("/topUser")
	public List<TopUser> listTopUser(){
		List<TopUser> listUser = new ArrayList<>();
		List<Map<String, Object>> listReturn = orderServiceImpl.getTop5User(5);
		for (Map<String, Object> map : listReturn) {
			TopUser topUser = new TopUser();
			String fullName = (String)map.get("fullName");
			double amount = (double) map.get("amount");
			topUser.setFullName(fullName);
			topUser.setAmount(amount);
			listUser.add(topUser);
			
		}
		return listUser;
	}
	
	@GetMapping("/totalAllAmount")
	public ResponseEntity<Double> totalAllAmount(){
		double total = orderRepo.totaAllAmount();
		return ResponseEntity.ok(total);
	}

}
