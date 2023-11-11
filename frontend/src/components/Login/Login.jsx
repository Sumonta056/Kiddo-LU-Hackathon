import React, { useState } from "react";
import styles from "../Login/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import LoginValidation from "./LoginValidation";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  // Collecting the login values
  const [values, setValues] = useState({
    phone: "", // Change from email to phone
    password: "",
  });

  // Collecting the login errors
  const [errors, setErrors] = useState({});

  // Taking values from the form (phone and password)
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value, // Change from [event.target.value] to event.target.value
    }));
  };

  // Submitting the form and checking for form values validation and returning errors
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(LoginValidation(values));

    if (Object.keys(errors).length === 0) {
      console.log(values);
      axios
        .post("http://localhost:3001/login", values)
        .then((res) => {
          if (res.data === "success") {
            navigate("/");
            alert("আপনি সফলভাবে লগইন করেছেন");
          } else {
            alert("কোন তথ্য পাওয়া যায়নি");
          }
        })
        .catch((error) => {
          console.error("Error while logging in:", error);
        });
    }
  };

  return (
    <div className={styles.loginScreen}>
      <div className={styles.container} id="container">
        <div
          className={`${styles["form-container"]} ${styles["sign-in-container"]}`}
        >
          <form action="" onSubmit={handleSubmit}>
            <h1>লগইন করুন</h1>
            <div className={styles.infield}>
              <input
                type="tel" // Use tel type for phone input
                id="phone" // Change from email to phone
                name="phone" // Change from email to phone
                placeholder="ফোন" // Update placeholder
                onChange={handleInput}
              />

              {errors.phone && (
                <span className={styles.error}>{errors.phone}</span>
              )}
            </div>
            <div className={styles.infield}>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="পাসওয়ার্ড"
                onChange={handleInput}
              />

              {errors.password && (
                <span className={styles.error}>{errors.password}</span>
              )}
            </div>
            <a href="#d" className={styles.forgot}>
              পাসওয়ার্ড ভুলে গিয়েছেন ?
            </a>
            <button
              type="submit"
              className={`${styles.button} ${styles.login}`}
            >
              লগইন
            </button>
          </form>
        </div>
        <div className={styles["overlay-container"]} id="overlayCon">
          <div className={styles.overlay}>
            <div
              className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}
            >
              <div className={styles["background-image"]} />
              <h1>
                <br />
                <Link
                  to="/signup"
                  className={`${styles.button} ${styles.registration}`}
                >
                  রেজিস্ট্রেশন করুন
                </Link>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
