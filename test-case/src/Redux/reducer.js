const initialState = {
  category: !localStorage.getItem("category")
    ? "all"
    : localStorage.getItem("category"),
  cart: !localStorage.getItem("cart")
    ? []
    : JSON.parse(localStorage.getItem("cart")),
  totalAmount: !localStorage.getItem("totalAmount")
    ? 0
    : JSON.parse(localStorage.getItem("totalAmount")),
  currency: !localStorage.getItem("currency")
    ? "$"
    : localStorage.getItem("currency"),
  currencyOpen: false,
  miniCartOpen: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      const { product } = action.payload;
      const addedProduct = state.cart.find(
        (cartProduct) => cartProduct.id === product.id
      );
      let addedState = {};
      if (addedProduct) {
        addedState = {
          ...state,
          cart: state.cart.map((cartProduct) =>
            cartProduct.id === product.id
              ? {
                  ...product,
                  amount: cartProduct.amount + 1,
                }
              : cartProduct
          ),
          totalAmount: state.totalAmount + 1,
        };
        localStorage.setItem("cart", JSON.stringify(addedState.cart));
        localStorage.setItem(
          "totalAmount",
          JSON.stringify(addedState.totalAmount)
        );
        return addedState;
      } else {
        addedState = {
          ...state,
          cart: [...state.cart, { ...product, amount: 1 }],
          totalAmount: state.totalAmount + 1,
        };
        localStorage.setItem("cart", JSON.stringify(addedState.cart));
        localStorage.setItem(
          "totalAmount",
          JSON.stringify(addedState.totalAmount)
        );
        return addedState;
      }
    case "REMOVE_PRODUCT_FROM_CART":
      const { removedProduct } = action.payload;
      const deletedProduct = state.cart.find(
        (cartProduct) => cartProduct.id === removedProduct.id
      );
      let renewState = {};
      if (deletedProduct.amount <= 1) {
        renewState = {
          ...state,
          cart: state.cart.filter((item) => item.id !== removedProduct.id),
          totalAmount: state.totalAmount - 1,
        };
        localStorage.setItem("cart", JSON.stringify(renewState.cart));
        localStorage.setItem(
          "totalAmount",
          JSON.stringify(renewState.totalAmount)
        );
        return renewState;
      } else {
        renewState = {
          ...state,
          cart: state.cart.map((item) =>
            item.id === removedProduct.id
              ? {
                  ...item,
                  amount: item.amount - 1,
                }
              : item
          ),
          totalAmount: state.totalAmount - 1,
        };
        localStorage.setItem("cart", JSON.stringify(renewState.cart));
        localStorage.setItem(
          "totalAmount",
          JSON.stringify(renewState.totalAmount)
        );
        return renewState;
      }

    case "CHECKBOX":
      localStorage.removeItem("cart");
      localStorage.removeItem("totalAmount");
      return { ...state, cart: [], totalAmount: 0 };

    case "CHANGE_CURRENCY":
      const { currency } = action.payload;
      let newCurrency = {
        ...state,
        currency: currency,
      };
      localStorage.setItem("currency", newCurrency.currency);
      return newCurrency;

    case "MINI_CART_CLICK":
      let newCartState = {
        ...state,
        currencyOpen: false,
        miniCartOpen: !state.miniCartOpen,
      };
      return newCartState;

    case "CURRENCY_CLICK":
      let newCurrencyState = {
        ...state,
        miniCartOpen: false,
        currencyOpen: !state.currencyOpen,
      };
      return newCurrencyState;

    case "CHANGE_CATEGORY":
      const { category } = action.payload;
      let newCategory = {
        ...state,
        category: category,
        miniCartOpen: false,
      };
      localStorage.setItem("category", newCategory.category);
      return newCategory;

    case "DROPDOWN_CLOSE":
      let newPage = {
        ...state,
        miniCartOpen: false,
        currencyOpen: false,
      };
      return newPage;

    default:
      return state;
  }
}
