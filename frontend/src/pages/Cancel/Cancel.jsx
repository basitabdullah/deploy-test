import { Link } from "react-router-dom";
import "./Cancel.scss";
import { FiAlertCircle } from "react-icons/fi";
const Cancel = () => {
  return (
    <div className="cancel-page">
      <div className="cancel">
        <FiAlertCircle />
        <p>Your transaction has been failed. Please try again !</p>

        <Link to="/cart">Back</Link>
      </div>
    </div>
  );
};

export default Cancel;
