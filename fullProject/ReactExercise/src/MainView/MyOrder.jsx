import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
export default function MyOrder(props) {
  const navigate = useNavigate();

  useEffect(() => {
    handleCheckLogin();
  }, []);
  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 5;
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

  return (
    <div className="container-fluid">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((item) => {
            return (
              <tr>
                <td>{item.orderId}</td>
                <td>{format(new Date(item.orderDate), "dd/MM/yyyy")}</td>
                <td>{item.totalAmount}</td>
                <td>
                  <Link
                    to="/orderDetail"
                    onClick={() => {
                      props.getMyOrderDetail(item.orderId);
                    }}
                  >
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ReactPaginate
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
  );
}
