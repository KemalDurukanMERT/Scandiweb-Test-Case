import React, { Component } from "react";
import { connect } from "react-redux";
import { addProductToCart, removeProductFromCart } from "../../Redux/action";
import Price from "../Price/Price";
import Slider from "../Slider/Slider";

class CartComponent extends Component {
  render() {
    const handlePlus = (item) => this.props.addProductToCart(item);
    const handleMinus = (item) => this.props.removeProductFromCart(item);
    let cartt = this.props.cart;

    return cartt.map((item, index) => (
      <div
        key={item.id}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <br />
          <br />
          <p style={{ fontWeight: "600", fontSize: "30px" }}>{item.brand}</p>
          <p style={{ fontWeight: "400", fontSize: "30px" }}>{item.name}</p>
          <div
            style={{ display: "inline", fontSize: "24px", lineHeight: "20px" }}
          >
            <Price prices={item.prices} />
          </div>
          <div className="cartAttributes">
            {item.attributes.map((attribute) => (
              <div
                style={{ display: "inline", margin: "0" }}
                className="allAttributes"
                key={`${item.id} ${attribute.name}`}
              >
                <p>
                  <b>{`${attribute.name}:`}</b>
                </p>
                <div
                  className="attributeOptionList"
                  style={{ display: "flex" }}
                >
                  {attribute.items.map((itemm) => (
                    <div key={`${item.id} ${itemm.id}`}>
                      <input
                        type="radio"
                        id={`${attribute.id} ${itemm.id}`}
                        name={attribute.name + index}
                        value={itemm.value}
                        defaultChecked={
                          itemm.selected
                        }
                      />
                      <label htmlFor={`${attribute.id} ${itemm.id}`}>
                        <div
                          className={
                            attribute.type !== "swatch"
                              ? "attributes__text cart-item__attributes-text_" +
                                itemm.selected
                              : "attributes__color cart-item__attributes-color_" +
                                itemm.selected
                          }
                          style={
                            attribute.type === "swatch"
                              ? {
                                  background: itemm.value,
                                  border: `1px solid ${
                                    itemm.id === "White" ? "black" : itemm.value
                                  }`,
                                  margin: "0",
                                }
                              : { margin: "0" }
                          }
                        >
                          {attribute.type === "swatch" ? "" : itemm.value}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"space-around", textAlign:"center"}}>
            <div onClick={() => handlePlus(item)} style={{border:"1px solid black", width:"45px", height:"45px",display:"flex", justifyContent:"center", alignItems:"center"}}>
              <span>+</span>
            </div>
            <div>{item.amount}</div>
            <div onClick={() => handleMinus(item)} style={{border:"1px solid black", width:"45px", height:"45px",display:"flex", justifyContent:"center", alignItems:"center"}}>
              <span>-</span>
            </div>
          </div>
          <div style={{marginLeft:"2rem"}}>
            <Slider item={item} />
          </div>
        </div>
      </div>
    ));
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.reducer.cart,
    totalAmount: state.reducer.totalAmount,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeProductFromCart: (product) => dispatch(removeProductFromCart(product)),
  addProductToCart: (product) => dispatch(addProductToCart(product)),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(CartComponent);
