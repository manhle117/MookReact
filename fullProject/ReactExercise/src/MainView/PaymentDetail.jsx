import React, { useEffect, useState } from "react";
import "./PaymentDetail.css";

import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function PaymentDetail(props) {
  useEffect(() => {
    const paramResponseCode = new URL(window.location).searchParams.get(
      "vnp_ResponseCode"
    );

    if (paramResponseCode && Number(paramResponseCode) === 0) {
      console.log("thanh toán", totalAmount);
      handlePayment();
    }
  }, []);
  const navigate = useNavigate();
  //tổng tiền
  const totalAmount = props.cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
  const totalQuantity = props.cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const OnSubmitPay = async () => {
    const dataPayment = {
      amount: totalAmount,
      vnpOrderInfo: "information",
      vnpReturnUrl: "http://localhost:3000/paymentDetail",
    };

    const responsePayment = await axios.post(
      "http://localhost:8080/create-payment",
      dataPayment
    );
    const linkPayment = await responsePayment.data;
    window.location.href = linkPayment;
  };
  const handlePayment = async () => {
    const user = localStorage.getItem("userId");
    const resp = await axios
      .post(`http://localhost:8080/api/orders/${user}`)
      .then((response) => {
        props.getCarts();
        props.getMyOrder();
        navigate("/");
        Swal.fire({
          title: "Thanh toán thành công",
          icon: "success",
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  //   //check ressult payment

  return (
    <div className="container-fluid pt-2">
      <nav aria-label="breadcrumb" style={{ borderRadius: "8px" }}>
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            <h4>
              <i class="fa fa-shopping-bag" aria-hidden="true"></i> Thanh toán
            </h4>
          </li>
        </ol>
      </nav>
      <div>
        <nav aria-label="breadcrumb" style={{ borderRadius: "8px" }}>
          <li class="breadcrumb-item active" aria-current="page">
            <h4>
              <i class="fa fa-location-arrow" aria-hidden="true"></i> Địa chỉ
              nhận hàng
            </h4>
            <br />
            <div className="d-flex">
              <p className="mr-auto">
                {props.account && (
                  <span>
                    <b>
                      {props.account.fullName} (+84, {props.account.phoneNumber}
                      )
                    </b>
                    <p>{props.account.address}</p>
                  </span>
                )}
              </p>
              <button className="btn btn-warning  " style={{ height: "40px" }}>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/profile"
                >
                  Thay đổi
                </Link>
              </button>
            </div>
          </li>
        </nav>
      </div>
      <div className="">
        <nav aria-label="breadcrumb" style={{ borderRadius: "8px" }}>
          <li class="breadcrumb-item active" aria-current="page">
            <h4>
              <i class="fa fa-product-hunt" aria-hidden="true"></i> Sản phẩm
            </h4>
            <br />
            <table className="table">
              <thead>
                <tr className="bg-success">
                  <th>Name</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {props.cart &&
                  props.cart.map((item) => (
                    <tr>
                      <td>{item.product.productName}</td>
                      <td>
                        <img
                          src={`http://localhost:8080/api/products/get-image/${item.product.image}`}
                          alt=""
                          width={60}
                        />
                      </td>
                      <td>
                        <span> {item.quantity} </span>
                      </td>
                      <td>{item.product.price}</td>
                      <td>{item.product.price * item.quantity} </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </li>
        </nav>
      </div>
      <div className="">
        <nav aria-label="breadcrumb" style={{ borderRadius: "8px" }}>
          <li class="breadcrumb-item active" aria-current="page">
            <h4>
              <i class="fa fa-credit-card" aria-hidden="true"></i> Hóa đơn
            </h4>
            <br />
            <b className="d-flex justify-content-end pb-2">
              Tổng tiền: {totalAmount.toLocaleString()}đ
            </b>
            <b className="d-flex justify-content-end pb-2">
              Số lượng sản phẩm: {totalQuantity}
            </b>

            <div className="d-flex justify-content-end">
              <button
                className="btn btn-danger ml-3"
                onClick={() => {
                  OnSubmitPay();
                }}
              >
                Thanh toán
              </button>
            </div>
          </li>
        </nav>
      </div>
    </div>
  );
}
