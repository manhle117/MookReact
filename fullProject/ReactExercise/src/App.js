import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./common/Login";
import HomeUser from "./MainView/HomeUser";
import { Routes, Route, useNavigate } from "react-router-dom";
import ListCake from "./MainView/ListCake";
import ProductDetail from "./MainView/ProductDetail";
import Header from "./MainView/Header";
import Cart from "./MainView/Cart";
import axios from "axios";
import Register from "./common/Register";
import Swal from "sweetalert2";
import HomeAdmin from "./admin/HomeAdmin";
import ListUserAdmin from "./admin/ListUserAdmin";
import MyOrder from "./MainView/MyOrder";
function App(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [cart, setCart] = useState([]);
  const [isUser, setIsUser] = useState(true);
  const [listOrders, setListOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("render");
    handleIsLogin();
    getCarts();
    getMyOrder();
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
  const handleDeleteItemFromCart = (id) => {
    Swal.fire({
      title: "Bạn có muốn xóa không?",
      text: "Bạn sẽ không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/carts/delete/${id}`)
          .then((response) => {
            getCarts();
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const getCarts = () => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`http://localhost:8080/api/carts/${userId}`)
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getItemToCart = (product, quantity) => {
    const user = localStorage.getItem("userId");
    if (user) {
      axios
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
      navigate("/login");
    }
  };
  const getMyOrder = () => {
    const id = localStorage.getItem("userId");
    axios.get(`http://localhost:8080/api/orders/${id}`).then((response) => {
      console.log(response.data);
      setListOrders(response.data);
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
        />
      )}
      <Routes>
        <Route
          path="/login"
          element={<Login setIsLogin={setIsLogin} getCarts={getCarts} />}
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
          path="/adminator"
          element={<HomeAdmin handleIsUser={handleIsUser} />}
        />
        <Route path="/MyOrder" element={<MyOrder listOrders={listOrders} />} />

        <Route
          path="/productDetail/:id"
          element={<ProductDetail getItemToCart={getItemToCart} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
