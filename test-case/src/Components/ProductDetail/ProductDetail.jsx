import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCTS_BY_ID } from "../../Data/queries";
import Price from "../Price/Price";
import { connect } from "react-redux";
import { addProductToCart } from "../../Redux/action";
import "./ProductDetail.css";
import { Link } from "react-router-dom";

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: "",
      attributes: [],
      warningMessage: "",
      success: "",
    };
  }

  handleOnChange = ({ target }) => {
    const { attributes } = this.state;
    const nextState = attributes.map((a) => {
      if (a.name !== target.name) return a;

      return {
        ...a,
        items: a.items.map((item) => {
          const checked = item.value === target.value;

          return {
            ...item,
            selected: checked,
          };
        }),
      };
    });

    this.setState({
      attributes: nextState,
      warningMessage: "",
    });
  };

  handleAdd = (product) => {
    const isSelected = this.state.attributes.map((attribute) =>
      attribute.items.find((item) => item.selected === true)
    );
    if (isSelected.every((item) => item !== undefined)) {
      const newId = `${product.id} ${isSelected.map((item) => item.id)}`;
      const updatedProduct = {
        ...product,
        attributes: this.state.attributes,
        amount: 1,
        id: newId,
      };
      this.props.addProductToCart(updatedProduct);
      this.setState({ warningMessage: "" });
      this.setState({ success: "yes" });
    } else {
      this.setState({ warningMessage: "Choose attribute first!" });
      this.setState({ success: "" });
    }
  };

  render() {
    const selectImage = (image) => {
      this.setState({ selectedImage: image });
    };

    return (
      <Query
        query={GET_PRODUCTS_BY_ID}
        variables={{ id: window.location.pathname.slice(8) }}
        onCompleted={(data) =>
          this.setState({ attributes: data.product.attributes })
        }
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.product === undefined) return null;

          const product = data.product;
          return (
            <div className="detailed_details">
              <div className="images__section">
                <div className="SmallImg">
                  {product.gallery.map((image, index) => (
                    <img
                      key={index}
                      className="iSmall"
                      onClick={() => selectImage(image)}
                      src={image}
                      alt=""
                    />
                  ))}
                </div>

                <img
                  src={
                    this.state.selectedImage
                      ? this.state.selectedImage
                      : product.gallery[0]
                  }
                  className="LargeImg"
                  alt=""
                />
              </div>

              <div className="cart__details">
                <h2 className="product__name">{product.name}</h2>

                <p className="product__brand">{product.brand}</p>
                <br />

                <div className="attributes-all">
                  {product.attributes.map((attribute) => {
                    // console.log(product);
                    return (
                      <div
                        className="attributes"
                        key={`${product.name} ${attribute.id}`}
                      >
                        <p className="attributes__title title">{`${attribute.name}:`}</p>
                        <div className="attributes__list">
                          {attribute.items.map((item) => (
                            <div key={`${product.name} ${item.id}`}>
                              <input
                                type="radio"
                                id={`${product.id} ${attribute.id} ${item.id}`}
                                name={attribute.name}
                                value={item.value}
                                disabled={product.inStock ? false : true}
                                checked={item.selected}
                                onChange={this.handleOnChange}
                              />
                              <label
                                htmlFor={`${product.id} ${attribute.id} ${item.id}`}
                              >
                                <div
                                  key={`${product.id} ${attribute.id} ${item.id}`}
                                  className={
                                    attribute.type === "swatch"
                                      ? "attributes__color"
                                      : "attributes__text"
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
                                          margin: "0rem",
                                        }
                                      : {
                                          margin: "0rem",
                                        }
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
                    );
                  })}
                </div>

                <div className="details_price">
                  <div className="label">PRICE:</div>
                  <div className="price__tag">
                    <Price prices={product.prices} />
                  </div>
                </div>
                <div className="button-block">
                  {product.inStock ? (
                    <div
                      onClick={() => this.handleAdd(product)}
                      className="add_to_cart"
                    >
                      ADD TO CART
                    </div>
                  ) : (
                    <div
                      className="out_of_stock_cart"
                    >
                      OUT OF STOCK
                    </div>
                  )}
                  {this.state.success !== "yes" ? (
                    <p className="warning red">{this.state.warningMessage}</p>
                  ) : (
                    <p className="success green">
                      Item has been added to cart!{" "}
                      <Link to="/"> continue shopping</Link>
                    </p>
                  )}
                </div>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.reducer.cart,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addProductToCart: (product) => dispatch(addProductToCart(product)),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(ProductDetail);
