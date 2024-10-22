import { useState } from "react";
import "./Contact.scss";
import { motion } from "framer-motion";
import axios from "../../lib/axios";
import { toast } from "react-hot-toast";
import MetaData from "../../components/MetaData";
const Contact = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/send-email", { name, email, message });
      toast.success("Message Sent Successfully!");
      setLoading(false);
    } catch (error) {
      toast.error("Internal Server Error, Try Again!");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="contact"
    >
      <MetaData title={"Meteor | Contact"} />
      <h1>Contact Meteor</h1>
      <form onSubmit={handleSubmit}>
        <div className="upper">
          <div className="email-input">
            <label>Enter your Name</label>
            <input
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="email-input">
            <label>Enter your email</label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="email-textarea">
          <label>Enter your Message</label>
          <textarea
            required
            cols="30"
            rows="10"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button>
          {loading ? "Sending..." : "Contact"}
          <img src="/vite.svg" alt="err" />
        </button>
      </form>
    </motion.div>
  );
};

export default Contact;
