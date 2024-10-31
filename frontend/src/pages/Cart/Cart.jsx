import { useEffect, useState } from "react";
import "./Cart.scss";
import { IoCloseSharp } from "react-icons/io5";
import { BiSolidError } from "react-icons/bi";
import { Link } from "react-router-dom";
import MetaData from "../../components/MetaData.jsx";
import { motion } from "framer-motion";
import { MdAttachMoney } from "react-icons/md";
import { useCartStore } from "../../stores/useCartStore.js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../../lib/axios.js";
import { useProductStore } from "../../stores/useProductStore.js";

const stripePromise = loadStripe(
  "pk_test_51Q1WxcGOd09WDjBnE2HoXFh6QFlCciriJzX0GNGowTeX21TBg5eD0m8jCzwdGhVIZpR1GqXv7BqcnPaZt2ziWTol00sM23RRBO"
);

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    total,
    subtotal,
    coupon,
    isCouponApplied,
    getMyCoupon,
    validateCoupon,
    removeCoupon,
  } = useCartStore();
  const { products, getRecomemdedProducts } = useProductStore();
  const { addToCart } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  useEffect(() => {
    getRecomemdedProducts();
  }, [getRecomemdedProducts]);

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) setCouponCode(coupon.code);
  }, [coupon]);

  const handleStripePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await axios.post("/payment/create/checkout/session", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });
      const session = res.data;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    validateCoupon(couponCode);
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setCouponCode("");
  };

  const savings = subtotal - total;
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="cart"
    >
      <MetaData title={"Meteor | Cart"} />
      {cart.length === 0 ? (
        <div className="empty-cart-container">
          <div className="empty-cart">
            <BiSolidError />
            <h3>Your cart is empty</h3>
            <Link to="/">Continue shopping</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="left">
            {cart.map((item) => (
              <div className="item" key={item._id}>
                <img src={item.image} alt="err" />
                <div className="details">
                  <h4>{item.name}</h4>
                  <div className="counter">
                    <span
                      onClick={() => {
                        updateQuantity(item._id, item.quantity - 1);
                      }}
                    >
                      -
                    </span>
                    <p className="count">{item.quantity}</p>
                    <span
                      onClick={() => {
                        updateQuantity(item._id, item.quantity + 1);
                      }}
                    >
                      +
                    </span>
                  </div>
                </div>
                <div className="price-sec">
                  <div
                    className="delete"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <IoCloseSharp />
                  </div>
                  <div className="price">${item.price}</div>
                </div>
              </div>
            ))}
            <div className="recommended-products">
              <h2>Recommended-Products</h2>
              <div className="products">
                {products.map((product) => (
                  <div
                    className="product-recommended-wrapper"
                    key={product._id}
                  >
                    <img src={product.image} alt="err" />
                    <div className="details">
                      <h2>{product.name}</h2>
                      <p>${product.price}</p>
                      <button onClick={() => addToCart(product)}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="right">
            <p className="subtotal">Subtotal : ${subtotal}</p>
            {savings > 0 && (
              <p className="saving">Saving : ${savings.toFixed(2)}</p>
            )}
            {coupon && (
              <p className="discount">
                Discount : <span>-{coupon.discountPercentage}%</span>
              </p>
            )}
            <b className="total">
              Total : <span>${total}</span>
            </b>

            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />

            <div className="coupon-buttons">
              <button onClick={handleApplyCoupon}>Apply Coupon</button>
              <button onClick={handleRemoveCoupon}>Remove Coupon</button>
            </div>
            {couponCode &&
              (isCouponApplied ? (
                <span className="green">
                  {" "}
                  ${savings} off using the <code>{coupon.code}</code>
                </span>
              ) : (
                <span className="red err">
                  <BiSolidError />
                  No Coupon Applied
                </span>
              ))}
            {/* <Link to="/shipping"> */}
            <button className="checkout-btn" onClick={handleStripePayment}>
              <MdAttachMoney />
              Checkout
            </button>
            {/* </Link> */}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Cart;
