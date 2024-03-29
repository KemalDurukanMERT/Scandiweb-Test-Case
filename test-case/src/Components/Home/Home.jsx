import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GET_PRODUCTS_BY_CATEGORY } from "../../Data/queries";
import {
  addProductToCart,
  changeCategory,
  dropdownClose,
} from "../../Redux/action";
import Price from "../Price/Price";
import {
  CategoryName,
  HomeComponent,
  Image,
  ImageDiv,
  InfoArea,
  MainOpacity,
  OutOfStock,
  PriceArea,
  ProductCart,
  ProductList,
} from "./Home.styled";
import { ReactComponent as CartIcon } from "../../pics/green-cart-icon.svg";

class Home extends Component {
  render() {
    return (
      <HomeComponent>
        {this.props.mainOpacity && <MainOpacity></MainOpacity>}
        <CategoryName>
          <p>{this.props.category}</p>
        </CategoryName>

        <ProductList>
          <Query
            query={GET_PRODUCTS_BY_CATEGORY}
            key={"yes"}
            variables={{
              input: { title: window.location.pathname.slice(1) },
            }}
          >
            {({ loading, error, data }) => {
              if (loading) return null;
              if (error) return console.log(error);
              if (data.category === undefined) return null;

              const products = data.category.products;
              const handleClick = (e, product) => {
                e.preventDefault();
                let updatedProduct = {};
                if (product.attributes.length === 0) {
                  updatedProduct = {
                    ...product,
                    amount: 1,
                    id: `${product.id} `,
                  };
                  this.props.addProductToCart(updatedProduct);
                } else {
                  const updatedAttributes = product.attributes.map((a) => {
                    return {
                      ...a,
                      items: a.items.map((item, index) => {
                        return index === 0
                          ? { ...item, selected: true }
                          : { ...item, selected: false };
                      }),
                    };
                  });
                  const selectedAttribute = updatedAttributes.map((a) =>
                    a.items.find((i) => i.selected === true)
                  );
                  updatedProduct = {
                    ...product,
                    attributes: updatedAttributes,
                    amount: 1,
                    id: `${product.id} ${selectedAttribute
                      .map((i) => i.id)
                      .join(" ")}`,
                  };
                  this.props.addProductToCart(updatedProduct);
                }
              };

              const handleDetail = () => {
                this.props.dropdownClose();
              };

              return products.map((item, index) => (
                <div key={index}>
                  <ProductCart >
                    <Link
                      to={{ pathname: `/detail/${item.id}` }}
                      className="link"
                    >
                      <div onClick={() => handleDetail()}>
                        <div>
                          <ImageDiv>
                            <Image src={item.gallery[0]} alt="" />
                            {!item.inStock && (
                              <OutOfStock>Out of stock</OutOfStock>
                            )}
                          </ImageDiv>
                          <div
                            className={!item.inStock ? "cartAddIcon-notStock" : "cartAddIcon"}
                          >
                            <CartIcon onClick={(e) => handleClick(e, item)}>
                              AddCart
                            </CartIcon>
                          </div>
                          <br />
                          <InfoArea>
                            <div className={!item.inStock ? "notInStock" : ""}>
                            <p>{item.name}</p>
                            <PriceArea>
                              <Price prices={item.prices} />
                            </PriceArea>
                            </div>
                          </InfoArea>
                        </div>
                      </div>
                    </Link>
                    <br />
                  </ProductCart>
                </div>
              ));
            }}
          </Query>
        </ProductList>
      </HomeComponent>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.reducer.cart,
    totalAmount: state.reducer.totalAmount,
    category: state.reducer.category,
    mainOpacity: state.reducer.mainOpacity,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addProductToCart: (product) => dispatch(addProductToCart(product)),
  changeCategory: (name) => dispatch(changeCategory(name)),
  dropdownClose: () => dispatch(dropdownClose()),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Home);
