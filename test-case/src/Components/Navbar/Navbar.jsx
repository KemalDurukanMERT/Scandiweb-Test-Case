import React, { Component } from "react";
import Categories from "./Categories/Categories";
import { ReactComponent as HeaderLogo } from "../../pics/header-logo.svg";
import CurrencyDropdown from "./CurrencyDropdown/CurrencyDropdown";
import MiniCart from "./MiniCart/MiniCart";
import { connect } from "react-redux";
import { currencyClick, miniCartClick } from "../../Redux/action";
import { ReactComponent as Down } from "../../pics/down.svg";
import trolley from "../../pics/trolley.png";
import "./Navbar.css"

class Navbar extends Component {
  render() {
    const handleClick = () => {
      this.props.miniCartClick();
    };
    const handleDropdown = () => {
      this.props.currencyClick();
    };

    return (
      <div className="navbar">
        <div className="categories">
          <Categories className="categories"/>
        </div>
        <div className="logo">
          <HeaderLogo />
        </div>
        <div className="actions">
          <div className="currency-area">
            <div
              className="currency"
              onClick={() => handleDropdown()}
            >
              <p>{this.props.currency ? this.props.currency : "$"}</p>
              <Down />
            </div>
            {this.props.currencyOpen ? <CurrencyDropdown /> : ""}
          </div>
          <div>
            <div className="mini-cart" onClick={() => handleClick()}>
              <img
                src={trolley}
                alt=""
                width="20px"
              />
              {this.props.cart.length !== 0 && (
                <div className="amount-circle">{this.props.totalAmount}</div>
              )}
            </div>
            {this.props.miniCartOpen ? <MiniCart /> : ""}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    miniCartOpen: state.reducer.miniCartOpen,
    currencyOpen: state.reducer.currencyOpen,
    currency: state.reducer.currency,
    cart: state.reducer.cart,
    totalAmount: state.reducer.totalAmount,
  };
};

const mapDispatchToProps = (dispatch) => ({
  currencyClick: () => dispatch(currencyClick()),
  miniCartClick: () => dispatch(miniCartClick()),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Navbar);
