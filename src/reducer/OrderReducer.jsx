const OrderReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return {
        ...state,
        orders: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
      };

    case "MARK_DELIVERED":
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order.orderId === action.payload && order.status !== "Delivered") {
            return { ...order, status: "Delivered" };
          }
          return order;
        }),
      };

    default:
      console.warn("Unknown action:", action.type);
      return state;
  }
};

export default OrderReducer;
