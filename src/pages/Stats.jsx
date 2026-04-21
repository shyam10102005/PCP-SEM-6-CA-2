import React from "react";
import { useOrder } from "../context/OrderContext";

const Stats = () => {
  const { getStats, loading } = useOrder();

  if (loading) return <p>Loading stats...</p>;

  const { totalOrders, deliveredOrders, cancelledOrders } = getStats();

  return (
    <div style={{ padding: "10px" }}>
      <h1>Orders Analytics Dashboard</h1>
      <div data-testid="total-orders">
        <strong>Total Valid Orders:</strong> {totalOrders}
      </div>
      <div data-testid="delivered-orders">
        <strong>Delivered Orders:</strong> {deliveredOrders}
      </div>
      <div data-testid="cancelled-orders">
        <strong>Cancelled Orders:</strong> {cancelledOrders}
      </div>
    </div>
  );
};

export default Stats;
