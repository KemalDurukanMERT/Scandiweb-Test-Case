import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCTS_BY_ID } from "../../Data/queries";
import Price from "../Price/Price";
import { connect } from "react-redux";
import { addProductToCart } from "../../Redux/action";
import "./ProductDetail.css";

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
            <div className="product-detail-main">
              {this.props.mainOpacity && <div className="main-opacity"></div>}
              <div className="product-details">
                <div className="images-section">
                  {product.gallery.map((image, index) => (
                    <img
                      key={index}
                      onClick={() => selectImage(image)}
                      src={image}
                      alt=""
                    />
                  ))}
                </div>
                <div className="info-area">
                  <div className="selected-image">
                    <img
                      src={
                        this.state.selectedImage
                          ? this.state.selectedImage
                          : product.gallery[0]
                      }
                      alt=""
                    />
                  </div>

                  <div className="cart-details">
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-name">{product.name}</div>
                    <div className="all-attributes">
                      {product.attributes.map((attribute) => {
                        return (
                          <div
                            className="attribute-area"
                            key={`${product.name} ${attribute.id}`}
                          >
                            <div className="attribute-title">
                              {attribute.name}:
                            </div>
                            <div className="attribute-list">
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
                                          ? "attribute-color"
                                          : "attribute-text"
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
                        );
                      })}
                    </div>

                    <div className="price-area">
                      <div className="label">PRICE:</div>
                      <div className="price-attribute">
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
                        <div className="out_of_stock_cart">OUT OF STOCK</div>
                      )}
                      {/* {this.state.success !== "yes" ? (
                      <p className="warning red">{this.state.warningMessage}</p>
                    ) : (
                      <p className="success green">
                        Item has been added to cart!{" "}
                        <Link to="/"> continue shopping</Link>
                      </p>
                    )} */}
                    </div>
                    <div
                      className="description"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    ></div>
                  </div>
                </div>
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
    mainOpacity: state.reducer.mainOpacity,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addProductToCart: (product) => dispatch(addProductToCart(product)),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(ProductDetail);
