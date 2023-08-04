import React from "react";

import CardItem from "./CardItem";
export default function ListCake(props) {
  return (
    <div className="row">
      {props.listProducts.map((item) => {
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
    </div>
  );
}
