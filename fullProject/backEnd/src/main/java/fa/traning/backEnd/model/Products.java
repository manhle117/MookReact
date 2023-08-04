package fa.traning.backEnd.model;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="Products")
public class Products {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer productId;
	
	@Column(name = "productName")
	private String productName;
	@Column(name = "ingredient")
	private String ingredient;
	@Column(name = "price")
	private Double price;
	@Column(name = "decription")
	private String decription;
	@Column(name = "image")
	private String image;
		
	
	
	
	
	
}
