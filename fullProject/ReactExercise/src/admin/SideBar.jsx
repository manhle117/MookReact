import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function SideBar(props) {
  return (
    <div className="col-3">
      <div
        className="d-flex flex-column vh-100 flex-shrink-0 p-3 text-white bg-dark"
        style={{ width: 250 }}
      >
        <Link
          to="/"
          onClick={() => {
            props.handleIsUser();
          }}
          className="d-flex align-i tems-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <svg className="bi me-2" width={40} height={32}></svg>
          <span className="fs-4">BakeryShop</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              to="#"
              className="nav-link text-white "
              onClick={() => {
                props.handleSetContent();
              }}
              aria-current="page"
            >
              <i className="fa fa-home" />
              <span className="ms-2">List Product</span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              onClick={() => {
                props.handleSetContent();
              }}
              className="nav-link text-white"
            >
              <i className="fa fa-dashboard" />
              <span className="ms-2">List User</span>
            </Link>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <i className="fa fa-first-order" />
              <span className="ms-2">My Orders</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <i className="fa fa-cog" />
              <span className="ms-2">Settings</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <i className="fa fa-bookmark" />
              <span className="ms-2">Bookmarks</span>
            </a>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
}
