import React, { useState, useEffect } from "react";
import { Products } from "./Product";
import "./hp.css";
import styles from "./hp.css";
import { Link } from "react-router-dom";

export default function App() {
  const [productData, setProductData] = useState([]); // Provide an initial empty array

  useEffect(() => {
    // Fetch product data from the backend API
    fetch("http://localhost:3001/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received from API:", data);
        setProductData(data);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  return (
    <div className="changeBack">
      <div className="changeBack1">
        <div className={styles["buttonsreg"]}>
          <Link
            to="/"
            className={`${styles["a"]} ${styles["centered-link"]}`}
          >
            Show Cart
          </Link>
          <Link
            to="/productRe"
            className={`${styles["a"]} ${styles["centered-link"]}`}
          >
            Sell Child Products
          </Link>
        </div>
      </div>
      <div className="App">
        {Array.isArray(productData) && productData.length > 0 ? (
          productData.map((product) => (
            <Products
              key={product.product_id}
              product_image={product.product_image}
              product_name={product.product_name}
              product_price={product.product_price}
              product_type={product.product_type}
              product_description={product.product_description}
              product_quality={product.product_quality}
            />
          ))
        ) : (
          <p>No product data available.</p>
        )}
      </div>
    </div>
  );
}
