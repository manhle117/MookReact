import React, { useEffect, useState } from "react";

export default function AddProduct(props) {
  const products = props.products;
  useEffect(() => {
    if (props.selectedProduct) {
      props.setProducts(props.selectedProduct);
      if (props.selectedProduct.image) {
        const previewURL = `http://localhost:8080/api/products/get-image/${props.selectedProduct.image}`;
        props.setImagePreview(previewURL);
      }
    } else {
      props.setProducts({
        productName: "",
        price: "",
        ingredient: "",
        decription: "",
        file: null,
      });
      props.setImagePreview(null);
    }
  }, [props.selectedProduct]);
  const [errors, setErrors] = useState({
    productName: "",
    price: "",
    ingredient: "",
    decription: "",
    file: null,
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!products.productName.trim()) {
      newErrors.productName = "Product name is required.";
      isValid = false;
    }

    if (!products.price) {
      newErrors.price = "Price is required.";
      isValid = false;
    } else if (isNaN(products.price)) {
      newErrors.price = "Price must be a valid number.";
      isValid = false;
    }
    if (!products.ingredient) {
      newErrors.ingredient = "ingredient  is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleSubmitWrapper = (event) => {
    const isValid = validateForm();
    if (isValid) {
      setErrors({
        productName: "",
        price: "",
        ingredient: "",
        decription: "",
        file: null,
      });
    }
    props.handleSubmit(event, isValid);
  };

  return (
    <div>
      <form onSubmit={handleSubmitWrapper}>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {props.selectedProduct ? "Update Product" : "Add New Product"}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="inputProductName">ProductName</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputProductName"
                    name="productName"
                    value={products.productName}
                    onChange={props.handleChange}
                  />
                  {errors.productName && (
                    <p className="error">{errors.productName}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="inputPrice">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputPrice"
                    name="price"
                    value={products.price}
                    onChange={props.handleChange}
                  />
                  {errors.price && <p className="error">{errors.price}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="inputIngredient">Ingredient</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputIngredient"
                    name="ingredient"
                    value={products.ingredient}
                    onChange={props.handleChange}
                  />
                  {errors.ingredient && (
                    <p className="error">{errors.ingredient}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="inputDescription">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDescription"
                    name="decription"
                    value={products.decription}
                    onChange={props.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputImage">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="inputImage"
                    name="file"
                    onChange={props.handleFileChange}
                  />
                </div>
                {props.imagePreview && (
                  <div className="form-group">
                    <img
                      src={props.imagePreview}
                      alt="Preview"
                      style={{ width: "200px" }}
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    props.setImagePreview(null);
                  }}
                >
                  {props.selectedProduct ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
