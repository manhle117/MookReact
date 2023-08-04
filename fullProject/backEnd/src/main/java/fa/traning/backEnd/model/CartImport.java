package fa.traning.backEnd.model;

import lombok.Data;

@Data
public class CartImport {
	private int cartId;
	private int userId;
	private int productId;
	private int quantity;
}
