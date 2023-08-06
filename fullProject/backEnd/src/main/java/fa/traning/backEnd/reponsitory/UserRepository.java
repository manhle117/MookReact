package fa.traning.backEnd.reponsitory;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fa.traning.backEnd.model.Products;
import fa.traning.backEnd.model.Users;
@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
 Users findByUsername(String username);

Optional<Users> findByUserId(int userId);

}
