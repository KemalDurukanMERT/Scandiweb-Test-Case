import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addProductToCart,
  checkbox,
  removeProductFromCart,
} from "../../Redux/action";
import Price from "../Price/Price";
import Slider from "../Slider/Slider";
import "./CartComponent.css";

class CartComponent extends Component {
  render() {
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
    const handlePlus = (item) => this.props.addProductToCart(item);
    const handleMinus = (item) => this.props.removeProductFromCart(item);
    let cartt = this.props.cart;

    return (
      <div className="cart-main">
        {this.props.mainOpacity && <div className="main-opacity"></div>}
        <div className="cart">
          <div className="cart-header">CART</div>
          <div className="cart-items">
            {cartt.map((item, index) => {
              return (
                <div key={`${item.id} ${index}`} className="item">
                  <div className="item-left">
                    <div className="brand">{item.brand}</div>
                    <div className="cart-name">{item.name}</div>
                    <div className="cart-price">
                      <Price prices={item.prices} />
                    </div>
                    <div className="attribute-side">
                      {item.attributes.map((attribute) => (
                        <div
                          className="attribute"
                          key={`${item.id} ${attribute.name}`}
                        >
                          <div className="cart-attribute-name">
                            {attribute.name}:
                          </div>
                          <div className="attribute-list">
                            {attribute.items.map((itemm) => (
                              <div
                                key={`${item.id} ${itemm.id}`}
                                className="attribute-list-item"
                              >
                                <input
                                  type="radio"
                                  id={`${attribute.id} ${itemm.id}`}
                                  name={attribute.name + index}
                                  value={itemm.value}
                                  defaultChecked={itemm.selected}
                                />
                                <label htmlFor={`${attribute.id} ${itemm.id}`}>
                                  <div
                                    className={
                                      attribute.type !== "swatch"
                                        ? "attribute-list-item-text"
                                        : "attribute-list-item-color"
                                    }
                                    style={
                                      attribute.type === "swatch"
                                        ? {
                                            background: itemm.value,
                                            border: `1px solid ${
                                              itemm.id === "White"
                                                ? "black"
                                                : itemm.value
                                            }`,
                                          }
                                        : {}
                                    }
                                  >
                                    <div className="attribute-label">
                                      {attribute.type === "swatch"
                                        ? ""
                                        : itemm.value}
                                    </div>
                                  </div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="item-right">
                    <div className="amount-button">
                      <div
                        className="plus-button"
                        onClick={() => handlePlus(item)}
                      >
                        <span>+</span>
                      </div>
                      <div className="quantity">{item.amount}</div>
                      <div
                        className="minus-button"
                        onClick={() => handleMinus(item)}
                      >
                        <span>-</span>
                      </div>
                    </div>
                    <div className="image-side">
                      <Slider item={item} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="data-result">
            <div className="label1">Tax 21%:</div>
            <div className="result">
              {this.props.currency}
              {(totalPrice() * 0.21).toFixed(2)}
            </div>
            <br />
            <div className="label2">Quantity:</div>
            <div className="result">{this.props.totalAmount}</div>
            <br />
            <div className="label3">Total:</div>
            <div className="result">
              {this.props.currency}
              {totalPrice()}
            </div>
          </div>
          <div className="button" onClick={() => handleClick()}>
            ORDER
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.reducer.cart,
    totalAmount: state.reducer.totalAmount,
    currency: state.reducer.currency,
    mainOpacity: state.reducer.mainOpacity,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeProductFromCart: (product) => dispatch(removeProductFromCart(product)),
  addProductToCart: (product) => dispatch(addProductToCart(product)),
  checkbox: () => dispatch(checkbox()),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(CartComponent);
