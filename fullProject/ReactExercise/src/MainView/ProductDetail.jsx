import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./StyleProductDetail.css";
export default function ProductDetail(props) {
  const [productDetail, setProductDetail] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  useEffect(() => {
    getProductDetail(id);
  }, [id]);
  const getProductDetail = async (id) => {
    await axios
      .get(`http://localhost:8080/api/products/productDetail/${id}`)
      .then((response) => {
        setProductDetail(response.data);
      });
  };

  return (
    <>
      <h2 className="d-flex justify-content-center text-bold">
        Chi tiết giỏ hàng
      </h2>
      <div className="col-7 bg-warning mx-auto" style={{ borderRadius: "6px" }}>
        <div className="row">
          <div className="col-md-5">
            <div className="main-img">
              <img
                className="img-fluid mt-2"
                src={`http://localhost:8080/api/products/get-image/${productDetail.image}`}
                alt="ProductS"
                style={{ height: "400px" }}
              />
            </div>
          </div>
          <div className="col-md-7">
            <div className="main-description px-2">
              <div className="product-title text-bold my-3">
                {productDetail.productName}
              </div>
              <div className="price-area my-4">
                <p className="new-price text-bold mb-1">
                  {productDetail.price?.toLocaleString()} đ
                </p>
              </div>
              <div className="buttons d-flex my-5">
                <div className="block">
                  <button
                    className="shadow btn custom-btn"
                    onClick={() => {
                      props.getItemToCart(productDetail, quantity, true);
                    }}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
                <div className="block quantity">
                  <input
                    type="number"
                    className="form-control"
                    id="cart_quantity"
                    value={quantity}
                    onChange={(e) => {
                      if (e.target.value > 0) {
                        setQuantity(e.target.value);
                      } else {
                        setQuantity(1);
                      }
                    }}
                    min={1}
                    placeholder="Enter email"
                    name="cart_quantity"
                  />
                </div>
              </div>
            </div>
            <div className="product-details my-4">
              <p className="details-title text-color mb-1">Mô tả</p>
              <p className="description">{productDetail.decription}</p>
            </div>
            <div className="product-details my-4">
              <p className="details-title text-color mb-2">Thành phần </p>
              <p className="description">{productDetail.ingredient}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
