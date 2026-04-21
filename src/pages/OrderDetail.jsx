import React from "react";
import { useParams, Link } from "react-router-dom";
import { useOrder } from "../context/OrderContext";

const OrderDetail = () => {
  const { id } = useParams();
  const { orders, loading } = useOrder();

  if (loading) return <p>Loading...</p>;

  const order = orders.find((o) => String(o.orderId) === String(id));

  if (!order) {
    return (
      <div>
        <h2>Order not found</h2>
        <Link to="/orders">Back to Orders</Link>
      </div>
    );
  }

  const customerName = order.customerName || "Unknown";

  return (
    <div style={{ padding: "10px" }}>
      <h1>Order #{order.orderId}</h1>
      <p><strong>Customer:</strong> {customerName}</p>
      <p><strong>Restaurant:</strong> {order.restaurant || "N/A"}</p>
      <p><strong>Status:</strong> {order.status || "N/A"}</p>
      {order.deliveryTime && (
        <p><strong>Delivery Time:</strong> {order.deliveryTime}</p>
      )}
      {order.rating != null && (
        <p><strong>Rating:</strong> {order.rating}</p>
      )}
      <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>

      <h2>Items</h2>
      {Array.isArray(order.items) && order.items.length > 0 ? (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name || "N/A"}</td>
                <td>₹{item.price || 0}</td>
                <td>{item.quantity || 0}</td>
                <td>₹{(item.price || 0) * (item.quantity || 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in this order.</p>
      )}

      <br />
      <Link to="/orders">Back to Orders</Link>
    </div>
  );
};

export default OrderDetail;
