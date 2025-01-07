import React, { useState } from "react";
import "./CSS/LoginSignUp.css";

const LoginSignUp = () => {
  const url = "http://localhost:4000";

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agree, setAgree] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (state === "Sign Up" && !formData.username.trim()) {
      alert("Name is required.");
      return false;
    }
    if (!formData.email.trim()) {
      alert("Email is required.");
      return false;
    }
    if (!formData.password.trim()) {
      alert("Password is required.");
      return false;
    }
    if (!agree) {
      alert("You must agree to the terms of use and privacy policy.");
      return false;
    }
    return true;
  };

  const login = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.errors || "Login failed.");
      }
    } catch (error) {
      alert("An error occurred during login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const signup = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`${url}/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.errors || "Sign-up failed.");
      }
    } catch (error) {
      alert("An error occurred during sign-up. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-signup">
      <div className="login-signup-container">
        <h1>{state}</h1>
        <div className="login-signup-fields">
          {state === "Sign Up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Your Password"
            required
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Continue"}
        </button>
        {state === "Login" ? (
          <p className="login-signup-login">
            Create An Account?{" "}
            <span onClick={() => setState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p className="login-signup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login Here</span>
          </p>
        )}
        <div className="login-signup-agree">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <p>By continuing, I agree to the terms of use and privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
