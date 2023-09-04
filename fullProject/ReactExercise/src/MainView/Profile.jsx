import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import "./ProfileStyle.css";
export default function Profile(props) {
  const account = props.account;
  const setAccount = props.setAccount;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmitUpdateProfile = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("fullName", account.fullName);
    formData.append("email", account.email);
    formData.append("phoneNumber", account.phoneNumber);
    formData.append("address", account.address);
    await axios
      .put(`http://localhost:8080/api/users/update/${userId}`, formData)
      .then((res) => {
        Swal.fire({
          title: "Update Success",
          icon: "success",
        });
        setAccount(res.data);
        closeModal();
        props.getUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const closeModal = () => {
    if (window.$) {
      window.$("#exampleModalProfile").modal("hide");
    }
  };
  return (
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-xl-6 col-md-12">
            <div className="card user-card-full" style={{ height: "271px" }}>
              <div className="row m-l-0 m-r-0">
                <div
                  className="col-sm-4 bg-c-lite-green user-profile"
                  style={{ height: "271px" }}
                >
                  <div className="card-block text-center text-white">
                    <div className="m-b-25">
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        className="img-radius"
                        alt="User-Profile-Imae"
                      />
                    </div>
                    <h6 className="f-w-600">{account.username}</h6>
                    <button
                      type="button"
                      className="btn"
                      style={{
                        backgroundColor: "#f07a68",
                        borderColor: "#f07a68",
                      }}
                      data-toggle="modal"
                      data-target="#exampleModalProfile"
                    >
                      <i class="fa fa-pencil-square" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-block">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                      Thông tin cá nhân
                    </h6>
                    <div className="row">
                      <div className="col-sm-12">
                        <p className="m-b-10 f-w-600">Họ tên</p>
                        <h6 className="text-muted f-w-400">
                          {account.fullName}
                        </h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Email</p>
                        <h6 className="text-muted f-w-400">{account.email}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Số điện thoại</p>
                        <h6 className="text-muted f-w-400">
                          {account.phoneNumber}
                        </h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <p className="m-b-10 f-w-600">Địa chỉ</p>
                        <h6 className="text-muted f-w-400">
                          {account.address}
                        </h6>
                      </div>
                    </div>
                    <ul className="social-link list-unstyled m-t-40 m-b-10">
                      <li>
                        <a
                          href="#!"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title
                          data-original-title="facebook"
                          data-abc="true"
                        >
                          <i
                            className="mdi mdi-facebook feather icon-facebook facebook"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title
                          data-original-title="twitter"
                          data-abc="true"
                        >
                          <i
                            className="mdi mdi-twitter feather icon-twitter twitter"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title
                          data-original-title="instagram"
                          data-abc="true"
                        >
                          <i
                            className="mdi mdi-instagram feather icon-instagram instagram"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModalProfile"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={handleSubmitUpdateProfile}>
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Chỉnh sửa thông tin
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div className="form-group">
                  <label htmlFor="fullName" />
                  Họ tên
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={account.fullName}
                    onChange={handleChange}
                    className="form-control"
                    aria-describedby="helpId"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber" />
                  Số điện thoại
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={account.phoneNumber}
                    onChange={handleChange}
                    className="form-control"
                    aria-describedby="helpId"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" />
                  Email
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={account.email}
                    onChange={handleChange}
                    className="form-control"
                    aria-describedby="helpId"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address" />
                  Địa chỉ
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={account.address}
                    onChange={handleChange}
                    className="form-control"
                    aria-describedby="helpId"
                    required
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
