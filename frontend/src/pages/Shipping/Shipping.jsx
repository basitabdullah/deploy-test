import { useState } from "react";
import "./Shipping.scss";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import MetaData from "../../components/MetaData.jsx"

const Shipping = () => {
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const navigate = useNavigate()
  
  return (
    <div className="shipping-page">
      <MetaData title={'Meteor | Shipping'}/>

      <button className="back" onClick={()=>navigate("/cart")}><IoArrowBackOutline/></button>
      <div className="shipping-container">
        <h4>Shipping Address</h4>
        <div className="address">
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}

          />
          <input  
            type="text"
            placeholder="City"
            onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}

          />
        </div>
        <input
          type="text"
          placeholder="State"
          onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}

        />
        <select
          placeholder="Country"
          onChange={(e) => setShippingInfo(prev => ({ ...prev, country: e.target.value }))}

        >
          <option value="">Choose Country</option>
          <option value="US">United States</option>
          <option value="In">India</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
        </select>

        <input
          type="number"
          placeholder="Pincode"
          onChange={(e) => setShippingInfo(prev => ({ ...prev, pincode  : e.target.value }))}

        />
        <button>Pay Now</button>
      </div>
    </div>
  );
};

export default Shipping;
