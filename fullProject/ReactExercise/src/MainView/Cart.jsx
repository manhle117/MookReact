import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
export default function Cart(props) {
  const cart = props.cart;
  const deleteItem = props.deleteItem;
  const handleQuantity = props.getItemToCart;
  const hasItem = cart.length > 0;

  const totalPayment = cart.reduce((totalPayment, item) => {
    return totalPayment + item.quantity * item.product.price;
  }, 0);
  const handleClearCart = async () => {
    const userId = localStorage.getItem("userId");
    await axios
      .delete(`http://localhost:8080/api/carts/deleteAllCart/${userId}`)
      .then((response) => {
        props.getCarts();
      });
  };
  const handlePayment = () => {
    const user = localStorage.getItem("userId");
    console.log(totalPayment);
    axios
      .post(`http://localhost:8080/api/orders/${user}/${totalPayment}`)
      .then((response) => {
        handleClearCart();
        props.getMyOrder();
        Swal.fire({
          title: "Thanh toán thành công",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title"
                style={{ textTransform: "uppercase, bold" }}
                id="exampleModalLabel"
              >
                Giỏ hàng
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <table class="table table-striped">
                {hasItem ? (
                  <>
                    <thead>
                      <tr>
                        <th>Tên bánh</th>
                        <th>Hình ảnh</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Tổng tiền</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => {
                        return (
                          <tr key={item.cartId}>
                            <td>{item.product.productName}</td>
                            <td>
                              <img
                                src={`http://localhost:8080/api/products/get-image/${item.product.image}`}
                                width={60}
                                alt="zxc"
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-info"
                                onClick={() => {
                                  handleQuantity(item.product, -1);
                                }}
                              >
                                -
                              </button>
                              <span
                                style={{
                                  paddingLeft: `5px`,
                                  paddingRight: `5px`,
                                }}
                              >
                                {item.quantity}
                              </span>
                              <button
                                className="btn btn-info"
                                onClick={() => {
                                  handleQuantity(item.product, 1);
                                }}
                              >
                                +
                              </button>
                            </td>
                            <td>{item.product.price.toLocaleString()}đ</td>
                            <td>
                              {(
                                item.quantity * item.product.price
                              ).toLocaleString()}
                              đ
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  deleteItem(item.cartId);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </>
                ) : (
                  <h2 className="text-danger ">Has no Item in your cart</h2>
                )}
              </table>
            </div>

            <div class="modal-footer">
              {hasItem && (
                <h3 className="mr-auto text-danger">
                  totalPayment: {totalPayment.toLocaleString()}đ
                </h3>
              )}
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              {hasItem && (
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    handlePayment(cart);
                  }}
                >
                  Purchase
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
