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
          <div className="frame12 bag-header">Bag is Empty</div>
        ) : (
          <div className="frame12">
            <div className="bag-header">
              <b>My Bag,</b> {localStorage.getItem("totalAmount")} items
            </div>
            <div className="items">
              {cartt.map((item, index) => {
                return (
                  <div className="frame9" key={index}>
                    <div className="frame8">
                      <div className="frame7">
                        <div className="frame3">
                          <div className="name">{item.brand}</div>
                          <div className="name">{item.name}</div>
                          <div className="price">
                            <Price prices={item.prices} />
                          </div>
                        </div>
                        {item.attributes.map((attribute) => (
                          <div
                            key={`${item.id} ${attribute.name}`}
                            className="attributes"
                          >
                            <div className="attribute-name">{`${attribute.name}:`}</div>
                            <div className="attribute-list">
                              {attribute.items.map((item) => (
                                <div key={`${item.id} ${item.id}`}>
                                  <input
                                    type="radio"
                                    id={`${attribute.id} ${item.id}`}
                                    name={attribute.name + index}
                                    value={item.value}
                                    defaultChecked={item.selected}
                                    disabled={true}
                                  />
                                  <label htmlFor={`${attribute.id} ${item.id}`}>
                                    <div
                                      className={
                                        attribute.type !== "swatch"
                                          ? "attribute-list_text-" +
                                            item.selected
                                          : "attribute-list_color-" +
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
                                            }
                                          : {}
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
                      <div className="frame4">
                        <div className="btn" onClick={() => handlePlus(item)}>
                          <span>+</span>
                        </div>
                        <div className="quantity">{item.amount}</div>
                        <div className="btn" onClick={() => handleMinus(item)}>
                          <span>-</span>
                        </div>
                      </div>
                    </div>
                    <div className="item-image">
                      <img src={item.gallery[0]} alt="" />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="total-price">
              <span>Total</span>
              <div>
                {this.props.currency}{totalPrice()}
              </div>
            </div>
          </div>
        )}

        <div className="mini-cart-btn">
          <Link to="/cart" className="linked">
            <div
              onClick={() => handleClick()}
              className="btn-view"
            >
              VIEW BAG
            </div>
          </Link>
          <div
            onClick={() => handleCheckout()}
            className="btn-checkout"
          >
            CHECK OUT
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
