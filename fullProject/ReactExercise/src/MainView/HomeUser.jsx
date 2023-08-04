import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Carousel from "./Carousel";
import Cart from "./Cart";
import Header from "./Header";
import ListCake from "./ListCake";
import ProductDetail from "./ProductDetail";
export default function HomeUser(props) {
  const [listProducts, setListProducts] = useState([]);
  const [itemSelected, setItemSelected] = useState(null);
  const [showCarousel, setShowCarousel] = useState(true);
  useEffect(() => {
    fetchListProducts();
  }, []);

  const fetchListProducts = (async) => {
    try {
      const response = axios
        .get("http://localhost:8080/api/products/")
        .then((response) => {
          setListProducts(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectedProduct = (product) => {
    setItemSelected(product);
    console.log("selectedProduct", itemSelected);
  };

  return (
    <div className="container-fluid">
      {showCarousel && <Carousel />}
      <ListCake
        listProducts={listProducts}
        handleSelectedProduct={handleSelectedProduct}
        getItemToCart={props.getItemToCart}
      />
      {itemSelected && (
        <ProductDetail
          getItemToCart={props.getItemToCart}
          itemSelected={itemSelected}
          showCarousel={setShowCarousel}
        />
      )}
    </div>
  );
}
