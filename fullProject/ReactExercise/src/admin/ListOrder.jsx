import React, { useState } from "react";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Swal from "sweetalert2";
import "react-paginate/theme/basic/react-paginate.css";
export default function ListOrder(props) {
  const listNotConfirm = props.listNotConfirm;
  const listOrder = props.listOrder;
  const listCancel = props.listCancel;
  const [currentPage1, setCurrentPage1] = useState(0);
  const [currentPage2, setCurrentPage2] = useState(0);
  const [currentPage3, setCurrentPage3] = useState(0);
  const ordersPerPage = 3;
  const pageCount1 = Math.ceil(listNotConfirm.length / ordersPerPage);
  const handlePageChange1 = ({ selected }) => {
    setCurrentPage1(selected);
  };
  const currentOrder1 = listNotConfirm.slice(
    currentPage1 * ordersPerPage,
    (currentPage1 + 1) * ordersPerPage
  );
  const pageCount2 = Math.ceil(listOrder.length / ordersPerPage);
  const handlePageChange2 = ({ selected }) => {
    setCurrentPage2(selected);
  };
  const currentOrder2 = listOrder.slice(
    currentPage2 * ordersPerPage,
    (currentPage2 + 1) * ordersPerPage
  );
  const pageCount3 = Math.ceil(listCancel.length / ordersPerPage);
  const handlePageChange3 = ({ selected }) => {
    setCurrentPage3(selected);
  };
  const currentOrder3 = listCancel.slice(
    currentPage3 * ordersPerPage,
    (currentPage3 + 1) * ordersPerPage
  );
  const confirmOrder = async (id) => {
    await axios
      .put(`http://localhost:8080/api/orders/cofirmOrder/${id}`)
      .then((res) => {
        Swal.fire({ title: "Xác nhận thành công", icon: "success" });
        props.getListOrderNotConfirm();
        props.fetchListOrderConfirm();
        props.getMyOrder();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="col-9" style={{ marginLeft: "280px" }}>
        <h2 className="row d-flex justify-content-center text-bold">
          Chờ xác nhận
        </h2>
        <table
          id="example"
          className=" table table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Total Amount</th>
              <th>Order Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentOrder1.map((item) => {
              return (
                <tr key={item.orderId}>
                  <td>{item.orderId}</td>
                  <td>{item.user.userId}</td>
                  <td>{item.user.fullName}</td>
                  <td>{item.totalAmount}</td>
                  <td>{format(new Date(item.orderDate), "dd/MM/yyyy")}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        confirmOrder(item.orderId);
                      }}
                    >
                      Xác nhận
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="row">
          <div className="col d-flex justify-content-end">
            <ReactPaginate
              className="react-paginate"
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount1}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange1}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
        <h2 className="row d-flex justify-content-center text-bold">
          Đã xác nhận
        </h2>
        <table
          id="example"
          className=" table table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Total Amount</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {currentOrder2.map((item) => {
              return (
                <tr key={item.orderId}>
                  <td>{item.orderId}</td>
                  <td>{item.user.userId}</td>
                  <td>{item.user.fullName}</td>
                  <td>{item.totalAmount}</td>
                  <td>{format(new Date(item.orderDate), "dd/MM/yyyy")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="row">
          <div className="col d-flex justify-content-end">
            <ReactPaginate
              className="react-paginate"
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount2}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange2}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
        <h2 className="row d-flex justify-content-center text-bold">Đã hủy</h2>
        <table
          id="example"
          className=" table table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Total Amount</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {currentOrder3.map((item) => {
              return (
                <tr key={item.orderId}>
                  <td>{item.orderId}</td>
                  <td>{item.user.userId}</td>
                  <td>{item.user.fullName}</td>
                  <td>{item.totalAmount}</td>
                  <td>{format(new Date(item.orderDate), "dd/MM/yyyy")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="row">
          <div className="col d-flex justify-content-end">
            <ReactPaginate
              className="react-paginate"
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount3}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange3}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
