package fa.traning.backEnd.model;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="Carts")
public class Carts {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer cartId;
	@Column
	private Integer quantity;
	@ManyToOne
	private Products product;
	
	@ManyToOne
	private Users user;
	
	public double priceItemCart() {
		return product.getPrice() * quantity;
	}
	

}
