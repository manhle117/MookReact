package fa.traning.backEnd.reponsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fa.traning.backEnd.model.Products;

@Repository
public interface ProductRepository extends JpaRepository<Products, Integer> {

}
