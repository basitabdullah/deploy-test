import "./Success.scss";
import { FaRegCheckCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore";
import axios from "../../lib/axios";
import Confetti from "react-confetti";


const Success = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const { clearCart } = useCartStore();
  const [error, setError] = useState(null);
  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        await axios.post("/payment/checkout-success", { sessionId });
        clearCart();
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("Session ID not found");
    }
  }, [clearCart]);

  if (isProcessing) {
    return <div>Processing...</div>;
  }
  if (error) {
    return <div>Error : {error}</div>;
  }
  return (
    <div className="success-page">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />
      <div className="success">
        <FaRegCheckCircle />
        <p>
          Your transaction has been completed successfully. Hope you shop again
          soon !
        </p>

        <Link to="/">Shop Again</Link>
      </div>
    </div>
  );
};

export default Success;
