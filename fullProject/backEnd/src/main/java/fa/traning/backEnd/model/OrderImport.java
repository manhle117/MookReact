package fa.traning.backEnd.model;

import java.util.Date;

import lombok.Data;

@Data
public class OrderImport {
	private int orderId;
	private int userId;
	private int productId;
	private double totalAmount;
	private Date orderDate;
}
