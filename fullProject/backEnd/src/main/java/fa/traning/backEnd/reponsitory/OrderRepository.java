package fa.traning.backEnd.reponsitory;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fa.traning.backEnd.model.Orders;
import fa.traning.backEnd.model.Users;

public interface OrderRepository extends JpaRepository<Orders, Integer> {

	List<Orders> findAllByUser(Users user);

	Orders findByOrderId(int id);

	Orders deleteByOrderId(int id);

	@Query("SELECT totalAmount as tongTien,day(orderDate) as ngay FROM Orders  "
			+ "WHERE status = 1 AND YEAR(orderDate) = :year AND MONTH(orderDate) = :month ")
	List<Map<String, Object>> calculateTotalSalesForDay(@Param("year") int year, @Param("month") int month);

	@Query("select user.username as fullName, sum(totalAmount) as amount "
			+ "from Orders where status =1 group by fullName order by amount DESC")
	List<Map<String, Object>> getTop5User(Pageable pageable);
	
	@Query("select sum(totalAmount) as total "
			+ "from Orders "
			+ "where status = 1 ")
	double totaAllAmount();
}
