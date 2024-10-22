import "./Navbar.scss";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { IoLockOpenOutline } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { useUserStore } from "../../stores/useUserStore";
import { useCartStore } from "../../stores/useCartStore";
const Navbar = () => {
  const { logout, user } = useUserStore();
  const { cart } = useCartStore();
  const itemsInCart = cart.length;
  return (
    <div className="navbar">
      <div className="left-sec">
        <Link to={"/"}>
          <p>HOME</p>
        </Link>
        <Link to={"/search"}>
          <p>PRODUCTS</p>
        </Link>
        <Link to={"/contact-us"}>
          <p>CONTACT</p>
        </Link>
      </div>
      <div className="logo">
        <h1>meteor</h1>
      </div>
      <div className="right-sec">
        <Link to={"/about"}>
          <p>ABOUT</p>
        </Link>

        <Link to={"/search"}>
          {" "}
          <IoSearchOutline />
        </Link>

        {user && user.role === "admin" && (
          <Link to={"/admin-dashboard"} className="admin-icon">
            <IoLockOpenOutline />
            <p>Admin Dashboard</p>
          </Link>
        )}
        <Link to="/login" className="login-icon">
          <IoPersonOutline />
          <p>Login</p>
        </Link>

        {user && (
          <>
            <Link to={"/cart"}>
              <BsCart2 />
              {itemsInCart > 0 && <p className="items-in-cart">{itemsInCart}</p>}
            </Link>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
