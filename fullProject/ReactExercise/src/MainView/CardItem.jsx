import React from "react";
import "./itemStyle.css";
import { NavLink } from "react-router-dom";
export default function CardItem(props) {
  const product = props.item;
  const quantity = 1;

  return (
    <div className="card m-2" key={product.productId}>
      <div className="d-flex sale pb-3">
        <div className="priceLabel">{product.price.toLocaleString()}đ</div>
      </div>
      <NavLink to={`/productDetail/${product.productId}`}>
        <img
          className="mx-auto"
          src={`http://localhost:8080/api/products/get-image/${product.image}`}
          width={300}
          height={300}
          style={{ borderRadius: "5px" }}
          alt=""
        />
      </NavLink>
      <div className="card-body text-center mx-auto">
        <h5 className="cardTitle">{product.productName}</h5>
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            props.getItemToCart(product, quantity, true);
          }}
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
