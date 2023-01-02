import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import { connect } from "react-redux";
import { GET_CURRENCIES } from "../../../Data/queries";
import { changeCurrency } from "../../../Redux/action";
import { Currency, DropDown } from "./CurrencyDropDown.styled";

class CurrencyDropdown extends Component {
  render() {
    return (
      <DropDown>
        <Query query={GET_CURRENCIES}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return console.log(error);
            if (data.currencies === undefined)
              return alert("Something Went Wrong!");

            const currencies = data.currencies;
            const handleSelect = (currency) => {
              this.props.changeCurrency(currency);
            };

            return (
              <div>
                {currencies.map((currency, index) => (
                  <Currency
                    style={{ display: "flex", justifyContent: "space-around", lineHeight:"160%" }}
                    key={index}
                    onClick={() => handleSelect(currency.symbol)}
                  >
                    <div>{currency.symbol}</div>
                    <div>{currency.label}</div>
                  </Currency>
                ))}
              </div>
            );
          }}
        </Query>
      </DropDown>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.reducer.currency,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeCurrency: (currency) => dispatch(changeCurrency(currency)),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(CurrencyDropdown);
