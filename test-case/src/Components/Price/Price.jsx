import React, { Component } from "react";
import { connect } from "react-redux";
import { changeCurrency } from "../../Redux/action";

class Price extends Component {
  render() {
    let selectedCurrency = this.props.prices.filter(
      (item) =>
        item.currency.symbol ===
        (this.props.currency ? this.props.currency : "$")
    );
    return (
      <div>
        {selectedCurrency[0].currency.symbol}
        {selectedCurrency[0].amount}
      </div>
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

export default functionFromConnect(Price);
