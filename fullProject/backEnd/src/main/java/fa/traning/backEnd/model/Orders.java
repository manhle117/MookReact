package fa.traning.backEnd.model;

import java.util.Date;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int orderId;
	@ManyToOne
	private Users user;
	private Date orderDate;
	private double totalAmount;
	
	
	
	
}
