import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function Cart(props) {
  const cart = props.cart;
  const deleteItem = props.deleteItem;
  const handleQuantity = props.getItemToCart;
  const hasItem = cart.length > 0;
  const navigate = useNavigate();
  const totalAmount = props.cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
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
                                  if (item.quantity === 1) {
                                    Swal.fire({
                                      title:
                                        "Bạn có muốn xóa sản phẩm này không?",
                                      html: `<span style="color: red">${item.product.productName}</span>`,
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes, delete it!",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        deleteItem(item.cartId);
                                        Swal.fire(
                                          "Đã xóa sản phẩm!",
                                          "sản phẩm đã bị xóa",
                                          "success"
                                        );
                                      }
                                    });
                                  } else {
                                    handleQuantity(item.product, -1, false);
                                  }
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
                                  handleQuantity(item.product, 1, false);
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
                                  Swal.fire({
                                    title:
                                      "Bạn có muốn xóa sản phẩm này không?",
                                    html: `<span style="color: red">${item.product.productName}</span>`,
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      deleteItem(item.cartId);
                                      Swal.fire(
                                        "Xóa thành công!",
                                        "sản phẩm đã bị xóa",
                                        "success"
                                      );
                                    }
                                  });
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
                  <h2 className="text-danger ">
                    Bánh ngon tuyệt, Cùng chọn và thưởng thức nào!!
                  </h2>
                )}
              </table>
            </div>

            <div class="modal-footer">
              {hasItem && (
                <h3 className="mr-auto text-danger">
                  Tổng tiền: {totalAmount.toLocaleString()}đ
                </h3>
              )}
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Đóng
              </button>
              {hasItem && (
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    props.closeModal();
                    navigate("/paymentDetail");
                  }}
                >
                  Mua hàng
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
