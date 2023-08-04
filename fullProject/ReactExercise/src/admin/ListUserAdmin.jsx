import React, { useState } from "react";
import ReactPaginate from "react-paginate";

export default function ListUserAdmin(props) {
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5;
  const pageCount = Math.ceil(props.listUsers.length / usersPerPage);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const currentUsers = props.listUsers.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  );
  return (
    <div className="col-9 my-auto">
      <h2 className="d-flex justify-content-center text-bold">List User</h2>
      <table
        id="example"
        className="table table-striped table-bordered"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>UserName</th>
            <th>Password</th>
            <th>Fullname</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => {
            return (
              <tr key={user.userId}>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.fullName}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-danger ml-1"
                    onClick={() => {
                      props.deleteUser(user.userId);
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
