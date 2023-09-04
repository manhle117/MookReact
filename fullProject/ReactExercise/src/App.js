import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./common/Login";
import HomeUser from "./MainView/HomeUser";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import ProductDetail from "./MainView/ProductDetail";
import Header from "./MainView/Header";
import axios from "axios";
import Register from "./common/Register";
import Swal from "sweetalert2";
import HomeAdmin from "./admin/HomeAdmin";
import MyOrder from "./MainView/MyOrder";
import OrderDetail from "./MainView/OrderDetail";
import PaymentDetail from "./MainView/PaymentDetail";
import Profile from "./MainView/Profile";

function App(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [cart, setCart] = useState([]);
  const [isUser, setIsUser] = useState(true);
  const [listOrders, setListOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [account, setAccount] = useState({
    username: "",
    password: "",
    fullName: "",
    role: "",
    address: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    handleIsLogin();
    getCarts();
    getMyOrder();
    getUser();
  }, []);

  const handleIsUser = () => {
    setIsUser(!isUser);
  };

  const handleIsLogin = () => {
    const login = localStorage.getItem("userId");
    if (login) {
      setIsLogin(true);
    }
  };
  const handleDeleteItemFromCart = async (id) => {
    await axios
      .delete(`http://localhost:8080/api/carts/delete/${id}`)
      .then((response) => {
        getCarts();
      });
  };
  const getCarts = async () => {
    const userId = localStorage.getItem("userId");
    await axios
      .get(`http://localhost:8080/api/carts/${userId}`)
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getUser = async () => {
    const id = localStorage.getItem("userId");
    await axios
      .get(`http://localhost:8080/api/users/getUser/${id}`)
      .then((res) => {
        setAccount(res.data);
      });
  };
  const getItemToCart = async (product, quantity, isHandleChange) => {
    const user = localStorage.getItem("userId");
    if (user) {
      if (isHandleChange) {
        await axios
          .post("http://localhost:8080/api/carts/addCartItem", {
            ...product,
            userId: user,
            quantity: quantity,
          })
          .then((response) => {
            Swal.fire({
              title: "thành công",
              icon: "success",
            });
            getCarts();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await axios
          .post("http://localhost:8080/api/carts/addCartItem", {
            ...product,
            userId: user,
            quantity: quantity,
          })
          .then((response) => {
            getCarts();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      navigate("/login");
    }
  };
  const closeModal = () => {
    if (window.$) {
      window.$("#exampleModal").modal("hide");
    }
  };

  const getMyOrder = async () => {
    const id = localStorage.getItem("userId");
    await axios
      .get(`http://localhost:8080/api/orders/${id}`)
      .then((response) => {
        setListOrders(response.data);
      });
  };
  const getMyOrderDetail = async (id) => {
    const resp = await axios
      .get(`http://localhost:8080/api/orderDetails/${id}`)
      .then((res) => {
        setOrderDetail(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  return (
    <>
      {isUser && (
        <Header
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          cart={cart}
          deleteItem={handleDeleteItemFromCart}
          handleIsUser={handleIsUser}
          getItemToCart={getItemToCart}
          getCarts={getCarts}
          getMyOrder={getMyOrder}
          account={account}
          handleDeleteItemFromCart={handleDeleteItemFromCart}
          closeModal={closeModal}
        />
      )}

      <Routes>
        <Route
          path="/login"
          element={
            <Login
              setIsLogin={setIsLogin}
              getCarts={getCarts}
              getUser={getUser}
              getMyOrder={getMyOrder}
            />
          }
        />
        <Route
          path="/"
          element={
            <HomeUser
              setCart={setCart}
              getCarts={getCarts}
              cart={cart}
              getItemToCart={getItemToCart}
            />
          }
        />
        <Route
          path="/adminator/*"
          element={
            account.role === "admin" ? (
              <HomeAdmin getMyOrder={getMyOrder} handleIsUser={handleIsUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/MyOrder"
          element={
            <MyOrder
              getMyOrderDetail={getMyOrderDetail}
              getMyOrder={getMyOrder}
              listOrders={listOrders}
            />
          }
        />
        <Route
          path="/orderDetail"
          element={<OrderDetail orderDetail={orderDetail} />}
        />

        <Route
          path="/productDetail/:id"
          element={<ProductDetail getItemToCart={getItemToCart} />}
        />

        <Route path="/register" element={<Register />} />
        <Route
          path="/paymentDetail"
          element={
            <PaymentDetail
              cart={cart}
              account={account}
              getMyOrder={getMyOrder}
              getCarts={getCarts}
              closeModal={closeModal}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              account={account}
              setAccount={setAccount}
              getUser={getUser}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
