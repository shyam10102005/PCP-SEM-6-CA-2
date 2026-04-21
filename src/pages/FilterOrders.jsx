import React, { useState } from "react";
import { useOrder } from "../context/OrderContext";
import OrderCard from "../components/OrderCard";

const FilterOrders = () => {
  const { getValidOrders, loading } = useOrder();
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  if (loading) return <p>Loading...</p>;

  const validOrders = getValidOrders();

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setError("Please enter a restaurant name to search.");
      setSearched(false);
      return;
    }
    setError("");
    setSearched(true);
  };

  const filteredOrders = searched
    ? validOrders.filter((order) =>
        order.restaurant &&
        order.restaurant.toLowerCase().includes(searchTerm.trim().toLowerCase())
      )
    : [];

  return (
    <div style={{ padding: "10px" }}>
      <h1>Filter Orders by Restaurant</h1>
      <div>
        <input
          type="text"
          placeholder="Enter restaurant name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setError("");
            setSearched(false);
          }}
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {searched && filteredOrders.length === 0 && !error && (
        <p>No results found</p>
      )}

      {searched &&
        filteredOrders.length > 0 &&
        filteredOrders.map((order) => (
          <OrderCard key={order.orderId} order={order} />
        ))}
    </div>
  );
};

export default FilterOrders;
