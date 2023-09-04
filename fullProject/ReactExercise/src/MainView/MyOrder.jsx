import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "react-paginate/theme/basic/react-paginate.css";
export default function MyOrder(props) {
  const navigate = useNavigate();

  useEffect(() => {
    handleCheckLogin();
  }, []);
  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 3;
  const pageCount = Math.ceil(props.listOrders.length / ordersPerPage);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const currentOrders = props.listOrders.slice(
    currentPage * ordersPerPage,
    (currentPage + 1) * ordersPerPage
  );
  const isLogin = localStorage.getItem("userId");
  const handleCheckLogin = () => {
    if (!isLogin) {
      navigate("/login");
    }
  };
  const cancelOrder = async (id) => {
    Swal.fire({
      title: "Bạn có muốn hủy đơn hàng này không?",
      text: "Bạn sẽ không thể hoàn tác",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý!!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:8080/api/orders/cancelOrder/${id}`)
          .then((res) => {
            props.getMyOrder();
          })
          .catch((er) => {
            console.log(er);
          });
        Swal.fire(
          "Hủy đơn hàng thành công!",
          "Cửa hàng sẽ liên hệ lại qua số điện thoại để hoàn tiền",
          "success"
        );
      }
    });
  };
  return (
    <div className="container-fluid">
      <h4 className="d-flex justify-content-center text-bold">CHỜ XÁC NHẬN</h4>
      <table class="table table-bordered mb-2">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày đặt hàng</th>
            <th>Tổng tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((item) => {
            return (
              item.status === 0 && (
                <tr key={item.orderId}>
                  <td>{item.orderId}</td>
                  <td>{format(new Date(item.orderDate), "dd/MM/yyyy")}</td>
                  <td>{item.totalAmount}</td>
                  <td style={{ width: "fit-content" }}>
                    <Link
                      to="/orderDetail"
                      onClick={() => {
                        props.getMyOrderDetail(item.orderId);
                      }}
                    >
                      <button className="btn btn-success">
                        <i class="fa fa-arrow-right" aria-hidden="true"></i> Xem
                        chi tiết
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => {
                        cancelOrder(item.orderId);
                      }}
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i> Hủy đơn
                      hàng
                    </button>
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
      <h4 className="d-flex justify-content-center text-bold mt-2">
        LỊCH SỬ ĐẶT HÀNG
      </h4>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày đặt hàng</th>
            <th>Tổng tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((item) => {
            return (
              item.status === 1 && (
                <tr key={item.orderId}>
                  <td>{item.orderId}</td>
                  <td>{format(new Date(item.orderDate), "dd/MM/yyyy")}</td>
                  <td>{item.totalAmount}</td>
                  <td style={{ width: "fit-content" }}>
                    <Link
                      to="/orderDetail"
                      onClick={() => {
                        props.getMyOrderDetail(item.orderId);
                      }}
                    >
                      <button className="btn btn-success">
                        <i class="fa fa-arrow-right" aria-hidden="true"></i> Xem
                        chi tiết
                      </button>
                    </Link>
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
      <div className="col-12 d-flex justify-content-end">
        <ReactPaginate
          className="react-paginate"
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
      <h4 className="d-flex justify-content-center text-bold">ĐÃ HỦY</h4>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày đặt hàng</th>
            <th>Tổng tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((item) => {
            return (
              item.status === 2 && (
                <tr key={item.orderId}>
                  <td>{item.orderId}</td>
                  <td>{format(new Date(item.orderDate), "dd/MM/yyyy")}</td>
                  <td>{item.totalAmount}</td>
                  <td style={{ width: "fit-content" }}>
                    <Link
                      to="/orderDetail"
                      onClick={() => {
                        props.getMyOrderDetail(item.orderId);
                      }}
                    >
                      <button className="btn btn-success">
                        <i class="fa fa-arrow-right" aria-hidden="true"></i> Xem
                        chi tiết
                      </button>
                    </Link>
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
