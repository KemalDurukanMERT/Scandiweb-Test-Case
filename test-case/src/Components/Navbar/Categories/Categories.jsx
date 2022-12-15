import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GET_CATEGORY_NAMES } from "../../../Data/queries";
import { changeCategory, dropdownClose } from "../../../Redux/action";
import { Button, CategoryItem } from "./Categories.styled";

class Categories extends Component {
  render() {
    return (
      <div>
        <Query query={GET_CATEGORY_NAMES}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return console.log(error);
            if (data.categories === undefined) return null;

            const categories = data.categories;
            const handleClick = (name) => {
              this.props.changeCategory(name);
              this.props.dropdownClose();
            };
            return categories.map((item, index) => (
              <Link key={index} to={`/${item.name}`}>
                <CategoryItem>
                  <Button onClick={() => handleClick(item.name)}>
                    {item.name.toUpperCase()}
                  </Button>
                </CategoryItem>
              </Link>
            ));
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.reducer.category,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeCategory: (name) => dispatch(changeCategory(name)),
  dropdownClose: () => dispatch(dropdownClose()),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Categories);
