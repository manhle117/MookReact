package fa.traning.backEnd.reponsitory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fa.traning.backEnd.model.Orders;
import fa.traning.backEnd.model.Users;

public interface OrderRepository extends JpaRepository<Orders, Integer> {

	List<Orders> findAllByUser(Users user);

}
