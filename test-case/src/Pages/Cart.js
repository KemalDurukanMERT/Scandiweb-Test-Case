import React, { Component } from "react";
import CartComponent from "../Components/Cart/CartComponent";
import Navbar from "../Components/Navbar/Navbar";

export default class Cart extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <CartComponent/>
      </div>
    );
  }
}

