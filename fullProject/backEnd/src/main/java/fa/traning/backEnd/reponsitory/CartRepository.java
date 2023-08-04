package fa.traning.backEnd.reponsitory;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fa.traning.backEnd.model.Carts;
import fa.traning.backEnd.model.Products;
import fa.traning.backEnd.model.Users;

@Repository
public interface CartRepository extends JpaRepository<Carts, Integer> {
	List<Carts> findAllByUser(Users user);

	Optional<Carts> findByUserAndProduct(Users user,Products product);
}
