import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "react-paginate/theme/basic/react-paginate.css";
export default function ListProductAdmin(props) {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5;

  const products = props.listProducts;
  const pageCount = Math.ceil(products.length / productsPerPage);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const currentProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );
  const deleteProd = props.deleteProduct;
  const selectedProduct = props.handleSelectedProduct;
  return (
    <div className="col-9 " style={{ marginLeft: "280px" }}>
      <h2 className="d-flex justify-content-center text-bold">List Product</h2>
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
              placeholder="Search for Product Name"
            />
          </div>
        </div>
      </div>

      <table
        id="example"
        className="table table-striped table-bordered"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>ingredient</th>
            <th>Description</th>
            <th>image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => {
            return (
              <tr key={product.productId}>
                <td style={{ maxWidth: "30px" }}>{product.productName}</td>
                <td>{product.price}</td>
                <td style={{ maxWidth: "70px", maxHeight: "20px" }}>
                  {product.ingredient}
                </td>
                <td style={{ maxWidth: "70px", maxHeight: "20px" }}>
                  {product.decription}
                </td>
                <td>
                  <img
                    src={`http://localhost:8080/api/products/get-image/${product.image}`}
                    width={60}
                    height={60}
                    alt={product.productName}
                  />
                </td>
                <td style={{ minWidth: "30px" }}>
                  <button
                    className="btn btn-success"
                    type="button"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => {
                      selectedProduct(product);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ml-1"
                    onClick={() => {
                      deleteProd(product.productId);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="row">
        <div className="col">
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
        <div className="col d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-success mb-2"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={() => {
              props.setSelectedProduct(null);
            }}
          >
            <i class="fa fa-plus mr-1 " aria-hidden="true"></i>
            Add new Product
          </button>
        </div>
      </div>
    </div>
  );
}
