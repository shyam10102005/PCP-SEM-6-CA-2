import React from "react";
import { useOrder } from "../context/OrderContext";
import OrderCard from "../components/OrderCard";

const Orders = () => {
  const { getValidOrders, loading, markDelivered } = useOrder();

  if (loading) return <p>Loading orders...</p>;

  const validOrders = getValidOrders();

  return (
    <div>
      <h1>Food Delivery Orders</h1>
      <p>Total Valid Orders: {validOrders.length}</p>
      {validOrders.length === 0 ? (
        <p>No valid orders found.</p>
      ) : (
        validOrders.map((order) => (
          <OrderCard
            key={order.orderId}
            order={order}
            onMarkDelivered={markDelivered}
          />
        ))
      )}
    </div>
  );
};

export default Orders;
