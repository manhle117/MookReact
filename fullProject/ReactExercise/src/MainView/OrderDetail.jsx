import React from "react";

export default function OrderDetail(props) {
  return (
    <div className="container-fluid">
      <table class="table table-bordered">
        <thead class="thead-inverse">
          <tr>
            <th>ID</th>
            <th>Sản Phẩm</th>
            <th>Hình ảnh</th>
            <th>Giá tiền</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {props.orderDetail.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.product.productName}</td>
                <td>
                  <img
                    src={`http://localhost:8080/api/products/get-image/${item.product.image}`}
                    width={60}
                    alt="zxc"
                  />
                </td>
                <td>{item.product.price.toLocaleString()}đ</td>
                <td>{item.quantity}</td>
              </tr>
            );
          })}
          <th colSpan={4}>
            Tổng tiền:
            {props.orderDetail[0]?.order?.totalAmount}đ
          </th>
        </tbody>
      </table>
    </div>
  );
}
