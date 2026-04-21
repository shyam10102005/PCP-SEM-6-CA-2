import React from "react";
import { Link } from "react-router-dom";

const OrderCard = ({ order, onMarkDelivered }) => {
  const customerName = order.customerName || "Unknown";

  return (
    <div data-testid="order-item" style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
      <h3>Order #{order.orderId}</h3>
      <p><strong>Customer:</strong> {customerName}</p>
      <p><strong>Restaurant:</strong> {order.restaurant}</p>
      <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
      <p><strong>Status:</strong> {order.status}</p>
      {order.deliveryTime && (
        <p><strong>Delivery Time:</strong> {order.deliveryTime}</p>
      )}
      {order.rating != null && (
        <p><strong>Rating:</strong> {order.rating}</p>
      )}
      <Link to={`/orders/${order.orderId}`}>View Details</Link>
      {onMarkDelivered && order.status !== "Delivered" && (
        <button
          onClick={() => onMarkDelivered(order.orderId)}
          style={{ marginLeft: "10px" }}
        >
          Mark as Delivered
        </button>
      )}
    </div>
  );
};

export default OrderCard;
