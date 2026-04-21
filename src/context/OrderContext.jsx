import { createContext, useContext, useReducer, useEffect } from "react";
import OrderReducer from "../reducer/OrderReducer";
import { getToken, getDataset } from "../api/api";
import initialOrders from "../data/initialOrders";

const initialState = {
  orders: [],
  loading: true,
};

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const tokenRes = await getToken(
          "E0323053",
          "769434",
          "A"
        );
        const orders = await getDataset(tokenRes.token, tokenRes.dataUrl);
        dispatch({ type: "SET_ORDERS", payload: orders });
      } catch (err) {
        console.error("Error fetching data:", err.message);
        console.log("Using fallback dataset...");
        dispatch({ type: "SET_ORDERS", payload: initialOrders });
      }
    };

    fetchOrders();
  }, []);

  const markDelivered = (orderId) =>
    dispatch({ type: "MARK_DELIVERED", payload: orderId });

  // Validation helper — checks if an order is valid (Q1 rules)
  const isValidOrder = (order) => {
    if (!order || typeof order !== "object") return false;
    if (!Array.isArray(order.items) || order.items.length === 0) return false;
    if (order.items.some((item) => !item.quantity || item.quantity <= 0))
      return false;
    if (
      order.totalAmount === undefined ||
      order.totalAmount === null ||
      typeof order.totalAmount !== "number" ||
      order.totalAmount <= 0
    )
      return false;
    return true;
  };

  // Get only valid orders (Q1) — derived, not stored
  const getValidOrders = () => {
    return state.orders.filter(isValidOrder);
  };

  // Compute stats dynamically using .reduce() (Q5)
  const getStats = () => {
    const validOrders = getValidOrders();
    return validOrders.reduce(
      (acc, order) => {
        acc.totalOrders += 1;
        if (order.status === "Delivered") acc.deliveredOrders += 1;
        if (order.status === "Cancelled") acc.cancelledOrders += 1;
        return acc;
      },
      { totalOrders: 0, deliveredOrders: 0, cancelledOrders: 0 }
    );
  };

  // Expose to window for testing (Q5 requirement)
  useEffect(() => {
    const stats = getStats();
    window.appState = stats;
  }, [state.orders]);

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        loading: state.loading,
        markDelivered,
        isValidOrder,
        getValidOrders,
        getStats,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
