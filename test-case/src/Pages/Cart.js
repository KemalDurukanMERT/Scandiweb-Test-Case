import React, { Component } from "react";
import { connect } from "react-redux";
import CartComponent from "../Components/Cart/CartComponent";
import Navbar from "../Components/Navbar/Navbar";
import { checkbox } from "../Redux/action";
import styled from "styled-components";

class Cart extends Component {
  render() {
    const Button = styled.div`
      width: 20vw;
      text-align: center;
      padding: 16px 25px;
      margin-right: 15px;
      margin-bottom: 9px;
      margin-top: 30px;
      color: white;
      cursor: pointer;
      transition: all 300ms ease-in-out;
      background-color: #499c34;
      :hover {
        background-color: #76af68;
        color: #222;
      }
    `;

    const handleClick = () => {
      this.props.checkbox();
    };

    const totalPrice = () => {
      const sum = this.props.cart.reduce((accumulator, item) => {
        if (localStorage.getItem("currency")) {
          let totalPrice = item.prices.find(
            (price) =>
              price.currency.symbol === localStorage.getItem("currency")
          );
          return accumulator + totalPrice.amount * item.amount;
        } else {
          let totalPrice = item.prices.find(
            (price) => price.currency.symbol === "$"
          );
          return accumulator + totalPrice.amount * item.amount;
        }
      }, 0);

      return Math.round(sum * 100) / 100;
    };
    return (
      <div>
        <Navbar />
        <div>
          <p style={{ fontWeight: "700", fontSize: "35px" }}>CART</p>
        </div>
        <CartComponent />
        <br />
        <hr />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "24px", display: "flex" }}>
            <div style={{width: "6rem"}}>Tax 21%:</div>
            <div>
              <b>
                {this.props.currency} {(totalPrice() * 0.21).toFixed(2)}
              </b>
            </div>
          </div>
          <div style={{ fontSize: "24px", display: "flex" }}>
            <div style={{width: "6rem"}}>Quantity:</div>
            <div>
              <b>{this.props.totalAmount}</b>
            </div>
          </div>
          <div style={{ fontSize: "24px", display: "flex" }}>
            <div style={{width: "6rem"}}>Total:</div>
            <div>
              <b>
                {this.props.currency} {totalPrice()}
              </b>
            </div>
          </div>
        </div>
        <Button onClick={() => handleClick()}>ORDER</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.reducer.cart,
    totalAmount: state.reducer.totalAmount,
    currency: state.reducer.currency,
  };
};

const mapDispatchToProps = (dispatch) => ({
  checkbox: () => dispatch(checkbox()),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Cart);
