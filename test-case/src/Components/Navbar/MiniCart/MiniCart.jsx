import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addProductToCart,
  checkbox,
  dropdownClose,
  removeProductFromCart,
} from "../../../Redux/action";
import Price from "../../Price/Price";
import "./MiniCart.css";

class MiniCart extends Component {
  render() {
    const handlePlus = (item) => this.props.addProductToCart(item);
    const handleMinus = (item) => this.props.removeProductFromCart(item);
    const handleClick = () => this.props.dropdownClose();
    const handleCheckout = () => this.props.checkbox();
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
    let cartt = this.props.cart;

    return (
      <div className="toggle__cart">
        {cartt.length === 0 ? (
          <div>Bag is Empty</div>
        ) : (
          <div>
            <div>
              <b>My Bag</b> {localStorage.getItem("totalAmount")} items
            </div>
            {cartt.map((item, index) => {
              return (
                <div className="mini-cart-item" key={index}>
                  <div className="mini-cart-item__info">
                    <p className="brand">{item.brand}</p>
                    <p className="name">{item.name}</p>
                    <Price prices={item.prices} />
                    {item.attributes.map((attribute) => (
                      <div
                        style={{
                          margin: "0",
                          padding: "0",
                        }}
                        key={`${item.id} ${attribute.name}`}
                      >
                        <p>{`${attribute.name}:`}</p>
                        <div
                          className="mini-cart-item__attributes-list"
                          style={{
                            margin: "0",
                            padding: "0",
                          }}
                        >
                          {attribute.items.map((item) => (
                            <div
                              key={`${item.id} ${item.id}`}
                              style={{
                                margin: "0",
                                padding: "0",
                                lineHeight: "0",
                              }}
                            >
                              <input
                                type="radio"
                                id={`${attribute.id} ${item.id}`}
                                name={attribute.name + index}
                                value={item.value}
                                disabled={
                                  item.selected
                                }
                              />
                              <label htmlFor={`${attribute.id} ${item.id}`}>
                                <div
                                  className={
                                    attribute.type !== "swatch"
                                      ? "mini-cart-item__attributes-text_" +
                                        item.selected
                                      : "mini-cart-item__attributes-color_" +
                                        item.selected
                                  }
                                  style={
                                    attribute.type === "swatch"
                                      ? {
                                          background: item.value,
                                          border: `1px solid ${
                                            item.id === "White"
                                              ? "black"
                                              : item.value
                                          }`,
                                          margin: ".2rem",
                                        }
                                      : { margin: ".2rem" }
                                  }
                                >
                                  {attribute.type === "swatch"
                                    ? ""
                                    : item.value}
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mini-cart-item__right" style={{marginRight: "0"}}>
                    <div className="mini-cart-item__quantity">
                      <div
                        className="btn-minus"
                        style={{ padding: "0", cursor: "pointer" }}
                        onClick={() => handleMinus(item)}
                      >
                        <span>-</span>
                      </div>
                      <div className="quantity">{item.amount}</div>
                      <div
                        className="btn-plus"
                        style={{ padding: "0", cursor: "pointer" }}
                        onClick={() => handlePlus(item)}
                      >
                        <span>+</span>
                      </div>
                    </div>
                    <div className="mini-cart-item__gallery" >
                      <img src={item.gallery[0]} alt="" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="mini-cart__total-price">
          <p>Total</p>
          <p>
            {this.props.currency} {totalPrice()} 
          </p>
        </div>
        <div className="mini-cart__btns">
          <Link to="/cart">
            <button
              onClick={() => handleClick()}
              className="btn-view mini-cart__btn"
            >
              VIEW BAG
            </button>
          </Link>
          <button
            onClick={() => handleCheckout()}
            className="btn-checkout mini-cart__btn"
          >
            CHECKOUT
          </button>
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeProductFromCart: (product) => dispatch(removeProductFromCart(product)),
  addProductToCart: (product) => dispatch(addProductToCart(product)),
  dropdownClose: () => dispatch(dropdownClose()),
  checkbox: () => dispatch(checkbox()),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(MiniCart);
