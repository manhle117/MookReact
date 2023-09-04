/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cart from "./Cart";
import "./ViewPurchase.css";

export default function Header(props) {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const navigate = useNavigate();
  const user = localStorage.getItem("userId");
  const handleLogout = () => {
    Swal.fire({
      title: "Đã đăng xuất",
      icon: "success",
    });
    setIsLogin(false);
    localStorage.removeItem("userId");
  };

  const loginAlready = localStorage.getItem("userId");
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <Cart
        cart={props.cart}
        deleteItem={props.deleteItem}
        getItemToCart={props.getItemToCart}
        getCarts={props.getCarts}
        getMyOrder={props.getMyOrder}
        handleDeleteItemFromCart={props.handleDeleteItemFromCart}
        closeModal={props.closeModal}
      />
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mynav"
        aria-controls="mynav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <a className="navbar-brand" href="#">
        <div className="d-flex">
          <div className="ms-3 d-flex flex-column">
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "30px",
                fontFamily: "Optima",
                fontWeight: "500",
              }}
            >
              Tiệm bánh MH
            </NavLink>
          </div>
        </div>
      </a>
      <div className="collapse navbar-collapse" id="mynav">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <Link to="/" style={{ textDecoration: "none" }}>
                Trang chủ
              </Link>
            </a>
          </li>
          {loginAlready && props.account.role === "admin" && (
            <li className="nav-item">
              <a className="nav-link" href="#">
                <Link
                  to="/adminator"
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    if (user !== null) {
                      props.handleIsUser();
                    } else {
                      navigate("/login");
                    }
                  }}
                >
                  Quản lý
                </Link>
              </a>
            </li>
          )}
          {loginAlready && (
            <li className="nav-item">
              <a className="nav-link" href="#">
                <Link to="/MyOrder" style={{ textDecoration: "none" }}>
                  Đơn hàng
                </Link>
              </a>
            </li>
          )}
          {loginAlready && (
            <li className="nav-item">
              <a className="nav-link" href="#">
                <div className="cart bg-purple">
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    style={{
                      borderStyle: "none",
                      borderColor: "none",
                      borderImage: "none",
                      padding: "4px 6px",
                      borderRadius: "6px",
                      position: "relative",
                      display: "inline",
                      background: "none",
                    }}
                  >
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                  </button>
                </div>
              </a>
            </li>
          )}

          <div className="topbar-divider d-none d-sm-block" />
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                className="img-profile rounded-circle"
                src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                alt=""
                height={30}
              />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              {loginAlready && (
                <a
                  className="dropdown-item"
                  href=""
                  data-toggle="modal"
                  data-target="#logoutModal"
                >
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                      marginLeft: " 27px",
                    }}
                    to="/profile"
                  >
                    <i
                      class="fa fa-user fa-sm fa-fw mr-2 text-gray-400"
                      aria-hidden="true"
                      style={{ left: "14px" }}
                    ></i>
                    Cá nhân
                  </Link>
                </a>
              )}
              {isLogin ? (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  className="dropdown-item"
                  href=""
                  data-toggle="modal"
                  data-target="#logoutModal"
                  onClick={() => {
                    handleLogout();
                    navigate("/");
                  }}
                >
                  <i className="fa fa-sign-out fa-sm fa-fw mr-2 text-gray-400" />
                  Đăng xuất
                </a>
              ) : (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <Link
                  className="dropdown-item"
                  to="/login"
                  data-toggle="modal"
                  data-target="#logoutModal"
                >
                  <i className="fa fa-sign-out fa-sm fa-fw mr-2 text-gray-400" />
                  Đăng nhập
                </Link>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
