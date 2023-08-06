/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cart from "./Cart";
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
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <Cart
        cart={props.cart}
        deleteItem={props.deleteItem}
        getItemToCart={props.getItemToCart}
        getCarts={props.getCarts}
        getMyOrder={props.getMyOrder}
      />
      <h2 className="d-flex float-start mr-3">
        <NavLink to="/" style={{ textDecoration: "none", Color: "violet" }}>
          BakeryShop
        </NavLink>
      </h2>

      <ul className="navbar-nav ml-auto">
        {loginAlready && (
          <button
            type="button"
            className="btn btn-success d-flex float-right mt-3"
            data-toggle="modal"
            data-target="#exampleModal"
            style={{ height: "50%" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-cart"
              viewBox="0 0 16 16"
              style={{ marginRight: "4px", marginBottom: "-2px" }}
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </button>
        )}

        <li className="nav-item dropdown no-arrow d-sm-none">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="searchDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fa fa-search fa-fw" />
          </a>
          <div
            className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
            aria-labelledby="searchDropdown"
          ></div>
        </li>
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
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              Valerie Luna
            </span>
            <img
              className="img-profile rounded-circle"
              src="https://images.contentstack.io/v3/assets/blt76b5e73bfd1451ea/bltb39c0e56787dd08c/64836bb8d5b9a543956dbecd/DevilTeemo_02.png?quality=90"
              alt=""
              height={50}
            />
          </a>
          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <Link
              to="/adminator"
              className="dropdown-item "
              onClick={() => {
                if (user !== null) {
                  props.handleIsUser();
                } else {
                  navigate("/login");
                }
              }}
            >
              Manager Page
            </Link>
            <Link to="/MyOrder" className="dropdown-item ">
              My Order
            </Link>

            <div className="dropdown-divider" />
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
                Logout
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
                Login
              </Link>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}
