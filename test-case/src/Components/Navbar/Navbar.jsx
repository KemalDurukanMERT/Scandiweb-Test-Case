import React, { Component } from "react";
import Categories from "./Categories/Categories";
import { ReactComponent as HeaderLogo } from "../../pics/header-logo.svg";
import CurrencyDropdown from "./CurrencyDropdown/CurrencyDropdown";
import MiniCart from "./MiniCart/MiniCart";
import { connect } from "react-redux";
import { currencyClick, miniCartClick } from "../../Redux/action";
import { ReactComponent as Down } from "../../pics/down.svg";
import { AmountCircle, NavbarOutside } from "./navbar.styled";
import trolley from "../../pics/trolley.png";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      categoryName: this.props.categoryName,
    };
  }
  render() {
    const handleClick = () => {
      this.props.miniCartClick();
    };
    const handleDropdown = () => {
      this.props.currencyClick();
    };

    return (
      <NavbarOutside>
        <div>
          <Categories />
        </div>
        <div>
          <HeaderLogo />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <div
              style={{
                fontSize: "x-large",
                display: "flex",
              }}
              onClick={() => handleDropdown()}
            >
              {this.props.currency ? this.props.currency : "$"}
              <Down style={{ marginLeft: "0.5rem", alignSelf: "center" }} />
            </div>
            {this.props.currencyOpen ? <CurrencyDropdown /> : ""}
          </div>
          <div>
            <div onClick={() => handleClick()}>
              {" "}
              <img
                src={trolley}
                alt=""
                height={23}
                style={{ objectFit: "contain" }}
              />
              {this.props.cart.length !== 0 && (
                <AmountCircle>{this.props.totalAmount}</AmountCircle>
              )}
            </div>
            {this.props.miniCartOpen ? <MiniCart /> : ""}
          </div>
        </div>
      </NavbarOutside>
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
