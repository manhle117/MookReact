package fa.traning.backEnd.reponsitory;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import fa.traning.backEnd.model.Carts;
import fa.traning.backEnd.model.Products;
import fa.traning.backEnd.model.Users;

@Repository
public interface CartRepository extends JpaRepository<Carts, Integer> {
	List<Carts> findAllByUser(Users user);

	void deleteByUser(Users user);

	Optional<Carts> findByUserAndProduct(Users user, Products product);

	@Transactional
	@Modifying
	@Query("DELETE FROM Carts c WHERE c.user.userId = :userId")
	void deleteByUserId(@Param("userId") Integer userId);
}
