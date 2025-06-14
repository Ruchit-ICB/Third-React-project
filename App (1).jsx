import React, { useState } from "react";
import "./styles.css";


const flavors = [
  "Vanilla",
  "Chocolate",
  "Strawberry",
  "Mango",
  "Butterscotch",
  "Pistachio",
];

function Home() {
  return <h2>🍦 Welcome to the Ice Cream Parlour!</h2>;
}

function Menu({ onAdd }) {
  const [selected, setSelected] = useState("");

  return (
    <div>
      <h3>Select a Flavor</h3>
      <div style={{ marginBottom: 10 }}>
        {flavors.map((flavor) => (
          <button
            key={flavor}
            onClick={() => setSelected(flavor)}
            style={{
              marginRight: 8,
              padding: "8px 12px",
              backgroundColor: selected === flavor ? "#f06292" : "#eee",
              color: selected === flavor ? "white" : "black",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            {flavor}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          if (selected) {
            onAdd(selected);
            setSelected("");
          }
        }}
        disabled={!selected}
        style={{
          padding: "8px 16px",
          backgroundColor: selected ? "#81c784" : "#ccc",
          border: "none",
          borderRadius: 5,
          cursor: selected ? "pointer" : "default",
          color: "white",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

function Cart({ items }) {
  return (
    <div>
      <h3>Your Cart</h3>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              🍨 {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("home");
  const [cart, setCart] = useState([]);

  const addToCart = (flavor) => {
    setCart((prev) => [...prev, flavor]);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20, maxWidth: 500, margin: "auto" }}>
      <header style={{ marginBottom: 20 }}>
        <h1>🍦 Ice Cream Parlour</h1>
        <nav style={{ marginBottom: 20 }}>
          <button onClick={() => setView("home")} style={{ marginRight: 10 }}>
            Home
          </button>
          <button onClick={() => setView("menu")} style={{ marginRight: 10 }}>
            Menu
          </button>
          <button onClick={() => setView("cart")}>Cart ({cart.length})</button>
        </nav>
      </header>

      <main>
        {view === "home" && <Home />}
        {view === "menu" && <Menu onAdd={addToCart} />}
        {view === "cart" && <Cart items={cart} />}
      </main>
    </div>
  );
}