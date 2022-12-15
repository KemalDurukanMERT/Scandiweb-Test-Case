export function addProductToCart(product) {
  return {
    type: "ADD_PRODUCT_TO_CART",
    payload: {
      product: product,
    },
  };
}

export function removeProductFromCart(product) {
  return {
    type: "REMOVE_PRODUCT_FROM_CART",
    payload: {
      removedProduct: product,
    },
  };
}

export function checkbox() {
  return {
    type: "CHECKBOX",
  };
}

export function changeCategory(category) {
  return {
    type: "CHANGE_CATEGORY",
    payload: {
      category: category,
    },
  };
}

export function currencyClick() {
  return {
    type: "CURRENCY_CLICK",
  };
}

export function miniCartClick() {
  return {
    type: "MINI_CART_CLICK",
  };
}

export function dropdownClose() {
  return {
    type: "DROPDOWN_CLOSE"
  };
}

export function changeCurrency(currency) {
    return {
      type: "CHANGE_CURRENCY",
      payload: {
        currency: currency,
      },
    };
  }