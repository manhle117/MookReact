import React, { useState } from "react";
import ReactPaginate from "react-paginate";

import CardItem from "./CardItem";
export default function ListCake(props) {
  const listProducts = props.listProducts;
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 6;
  const pageCount = Math.ceil(listProducts.length / productsPerPage);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const currentProducts = listProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );
  return (
    <div className="row">
      <div className="row height d-flex justify-content-center align-items-center mb-2">
        <div className="col-md-6">
          <div className="form">
            <i
              className="fa fa-search"
              style={{
                position: "absolute",
                top: "15px",
                left: "20px",
                color: "# 9ca3af",
              }}
            />
            <input
              type="text"
              className="form-control form-input"
              value={props.valueSearch}
              onChange={(e) => {
                props.setValueSearch(e.target.value);
              }}
              placeholder="Tìm kiếm tên bánh"
            />
          </div>
        </div>
      </div>
      {currentProducts.map((item) => {
        return (
          <div
            className="col-sm-4  d-flex justify-content-center"
            key={item.productId}
          >
            <CardItem
              item={item}
              getItemToCart={props.getItemToCart}
              handleSelectedProduct={props.handleSelectedProduct}
            />
          </div>
        );
      })}
      <div className="col-12 d-flex justify-content-center">
        <ReactPaginate
          className="react-paginate"
          previousLabel={"<"}
          nextLabel={">"}
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
    </div>
  );
}
