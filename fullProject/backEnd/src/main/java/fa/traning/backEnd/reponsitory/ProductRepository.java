package fa.traning.backEnd.reponsitory;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import fa.traning.backEnd.model.Products;

@Repository
public interface ProductRepository extends JpaRepository<Products, Integer> {

	@Query(value ="Select p.productName as productName,sum(od.quantity) as totalQuantity from Products as p "
			+ "inner join OrderDetails as od on p.productId = od.product.productId "
			+ "inner join Orders as o on od.order.orderId = o.orderId "
			+ "where o.status = 1 "
			+ "group by p.productName,od.quantity "	
			+ "order by sum(od.quantity) DESC ")
	 List<Map<String, Object>> getTopSellerProduct(Pageable pageable);

	List<Products> findAllByProductNameContaining(String search);

}
