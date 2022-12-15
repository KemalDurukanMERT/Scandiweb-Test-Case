import React, { Component } from "react";
import Navbar from "../Components/Navbar/Navbar";
import ProductDetail from "../Components/ProductDetail/ProductDetail";

export default class Detail extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <ProductDetail/>
      </div>
    );
  }
}
