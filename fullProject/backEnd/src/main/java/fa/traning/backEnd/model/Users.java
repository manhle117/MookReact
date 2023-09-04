package fa.traning.backEnd.model;


import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="Users")
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	@Column
	private String username;
	@Column
	private String password;
	private String fullName;
	@Column
	private String address;
	@Column
	private String phoneNumber;
	@Column String email;
	@Column
	private String Role;

	
	
}
