package fa.traning.backEnd.reponsitory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fa.traning.backEnd.model.OrderDetails;
import fa.traning.backEnd.model.Orders;


public interface OrderDetailRepository extends JpaRepository<OrderDetails, Integer>{

	List<OrderDetails> findByOrder(Orders order);

	

}
