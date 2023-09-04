import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Swal from "sweetalert2";
import AddProduct from "./AddProduct";
import ListOrder from "./ListOrder";
import ListProductAdmin from "./ListProductAdmin";
import ListUserAdmin from "./ListUserAdmin";
import ReportChart from "./ReportChart";
import SideBar from "./SideBar";

export default function HomeAdmin(props) {
  const [listProducts, setListProducts] = useState([]);
  const [isListProducts, setIsListProducts] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [listNotConfirm, setListNotConFirm] = useState([]);
  const [listCancel, setListCancel] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [products, setProducts] = useState({
    productName: "",
    price: "",
    ingredient: "",
    decription: "",
    file: null,
  });
  useEffect(() => {
    fetchListUser();
    fetchListOrderConfirm();
    getListOrderNotConfirm();
    fetchListOrderCancel();
  }, []);
  useEffect(() => {
    fetchListProduct();
  }, [valueSearch]);
  const handleSetContent = () => {
    setIsListProducts(!isListProducts);
  };
  const fetchListProduct = async () => {
    try {
      const response = await axios
        .get(`http://localhost:8080/api/products/?search=${valueSearch}`)
        .then((response) => setListProducts(response.data));
    } catch (error) {
      console.log("Error getting products", error);
    }
  };
  const fetchListUser = async () => {
    await axios
      .get("http://localhost:8080/api/users")
      .then((response) => {
        setListUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchListOrderConfirm = async () => {
    await axios
      .get("http://localhost:8080/api/orders/confirm")
      .then((res) => {
        setListOrder(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const fetchListOrderCancel = async () => {
    await axios
      .get("http://localhost:8080/api/orders/cancelList")
      .then((res) => {
        setListCancel(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const getListOrderNotConfirm = async () => {
    await axios
      .get("http://localhost:8080/api/orders/notConfirm")
      .then((res) => {
        setListNotConFirm(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const handleSelectedProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProducts((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (event, isValid) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", products.file);
    formData.append("productName", products.productName);
    formData.append("price", products.price);
    formData.append("ingredient", products.ingredient);
    formData.append("decription", products.decription);
    if (isValid) {
      if (selectedProduct) {
        axios
          .put(
            `http://localhost:8080/api/products/update/${selectedProduct.productId}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          )
          .then((response) => {
            console.log("update success", response.data);
            Swal.fire({
              title: "Update Success",
              icon: "success",
            });
            setProducts({
              productName: "",
              price: "",
              ingredient: "",
              decription: "",
              file: null,
            });
            setImagePreview(null);
            closeModal();
            fetchListProduct();
          });
      } else {
        axios
          .post("http://localhost:8080/api/products/add", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            console.log("add products successfully", response.data);
            Swal.fire({
              title: "Add Success",
              icon: "success",
            });
            setProducts({
              productName: "",
              price: "",
              ingredient: "",
              decription: "",
              file: null,
            });
            closeModal();
            fetchListProduct();
          })
          .catch((error) => {
            console.log("error: " + error);
          });
      }
    }
  };
  const closeModal = () => {
    if (window.$) {
      window.$("#exampleModal").modal("hide");
    }
  };
  const deleteProduct = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const deleteResponse = axios
            .delete(`http://localhost:8080/api/products/${id}`)
            .then((response) => {
              console.log("xóa thành công" + deleteResponse.data);
              fetchListProduct();
            });
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const deleteResponse = axios
            .delete(`http://localhost:8080/api/users/delete/${id}`)
            .then((response) => {
              console.log("xóa thành công" + deleteResponse.data);
              fetchListUser();
            });
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const previewURL = URL.createObjectURL(file); // Tạo URL dựa trên hình ảnh đã chọn
    setProducts((prevState) => ({
      ...prevState,
      file: file, // Lưu hình ảnh vào state
    }));
    setImagePreview(previewURL); // Lưu URL hình ảnh đã chọn vào state
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar
          handleIsUser={props.handleIsUser}
          handleSetContent={handleSetContent}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ListProductAdmin
                valueSearch={valueSearch}
                setValueSearch={setValueSearch}
                listProducts={listProducts}
                deleteProduct={deleteProduct}
                setSelectedProduct={setSelectedProduct}
                handleSelectedProduct={handleSelectedProduct}
              />
            }
          />
          <Route
            path="listProductAdmin"
            element={
              <ListProductAdmin
                valueSearch={valueSearch}
                setValueSearch={setValueSearch}
                listProducts={listProducts}
                deleteProduct={deleteProduct}
                setSelectedProduct={setSelectedProduct}
                handleSelectedProduct={handleSelectedProduct}
              />
            }
          />
          <Route
            path="listUser"
            element={
              <ListUserAdmin listUsers={listUsers} deleteUser={deleteUser} />
            }
          />
          <Route
            path="listOrder"
            element={
              <ListOrder  
              getMyOrder={props.getMyOrder}
                listCancel={listCancel}
                listOrder={listOrder}
                listNotConfirm={listNotConfirm}
                fetchListOrderConfirm={fetchListOrderConfirm}
                getListOrderNotConfirm={getListOrderNotConfirm}
              />
            }
          />
          <Route path="reportChart" element={<ReportChart />} />
        </Routes>
      </div>
      <AddProduct
        selectedProduct={selectedProduct}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
}
