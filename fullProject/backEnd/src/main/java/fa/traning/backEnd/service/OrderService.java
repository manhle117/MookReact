package fa.traning.backEnd.service;

import org.springframework.stereotype.Service;


public interface OrderService {
	boolean createNewOrder(int userId,double totalPayment);
}
