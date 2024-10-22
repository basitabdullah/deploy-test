import React, { useState } from "react";
import "./SignUp.scss";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import MetaData from "../../components/MetaData.jsx";
import { motion } from "framer-motion";
import { useUserStore } from "../../stores/useUserStore.js";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const { signup, user } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(userData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="login"
    >
      <MetaData title={"Meteor | SignUp"} />

      <form className="login-container">
        <h4>Signup</h4>
        <label>Name</label>
        <input
          type="text"
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />

        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <label>Confirm Password</label>
        <input
          type="password"
          onChange={(e) =>
            setUserData({ ...userData, confirmPassword: e.target.value })
          }
        />
        {error && <p>Error {error}</p>}
        <button onClick={handleSubmit}>
          Sign up <IoArrowForwardCircleOutline />
        </button>
        <p className="register-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </motion.div>
  );
};

export default Signup;
