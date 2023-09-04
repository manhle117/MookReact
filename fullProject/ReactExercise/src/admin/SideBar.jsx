import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function SideBar(props) {
  return (
    <div className="col-3 position-fixed">
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
              to="/adminator/listProductAdmin"
              className="nav-link text-white "
              // onClick={() => {
              //   props.handleSetContent();
              // }}
              aria-current="page"
            >
              <i className="fa fa-home" />
              <span className="ms-2">List Product</span>
            </Link>
          </li>
          <li>
            <Link
              to="/adminator/listUser"
              // onClick={() => {
              //   props.handleSetContent();
              // }}
              className="nav-link text-white"
            >
              <i className="fa fa-dashboard" />
              <span className="ms-2">List User</span>
            </Link>
          </li>
          <li>
            <Link
              to="/adminator/listOrder"
              // onClick={() => {
              //   props.handleSetContent();
              // }}
              className="nav-link text-white"
            >
              <i className="fa fa-dashboard" />
              <span className="ms-2">List Order</span>
            </Link>
          </li>
          <li>
            <Link to="/adminator/reportChart" className="nav-link text-white">
              <i className="fa fa-dashboard" />
              <span className="ms-2">Report</span>
            </Link>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
}
