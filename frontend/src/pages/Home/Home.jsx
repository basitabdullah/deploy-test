import "./Home.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Product from "../../components/Product/Product";
import MetaData from "../../components/MetaData.jsx";
import CarouselContainer from "../../components/CarouselContainer.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProductStore } from "../../stores/useProductStore.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../../lib/axios.js";

const Home = () => {
  const { getFeaturedProducts, products } = useProductStore();
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
  useEffect(() => {
    getFeaturedProducts();
  }, [getFeaturedProducts]);

  const categories = [
    {
      href: "/men",
      name: "Men",
      imageUrl:
        "https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_2000/cms/6MN5mrkw6hRncfKz6WSWYA/37ebe57832867529a22fb18df792815f/24Q3_FallFlow2_Site_ShopableFeatured_Desktop_2000x2000.jpg",
    },
    {
      href: "/women",
      name: "Women",
      imageUrl:
        "https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_1000/cms/6h3QXLL5Q7BSJalZ58YJ2c/37200a9dd056e864b378c8355cebfab2/24Q3_Tree_Breezer_Knit_Homepage_Dual-Panel_Module-1_Desktop_Mobile_2000x2000.png",
    },
    {
      href: "/kids",
      name: "Kids",
      imageUrl:
        "https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_1000/cms/TvLw7h5S6jQOw7fjGk753/4fbec36b099aeaa7e3134e9abefba408/24Q3_August_SeasonalCore_WorldOfComfort_Product_Homepage_Hero_Mobile_Option3_Clean_1651x1674.png",
    },
    {
      href: "/socks",
      name: "Socks",
      imageUrl:
        "https://images.unsplash.com/photo-1640026199235-c24aa417b552?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div className="home">
      <MetaData title={"Meteor | Home"} />
      <Carousel
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
      >
        <CarouselContainer
          image={
            "https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_1920/cms/6gwrEhj8SXRSYhCRhmjHli/97c732fd5075378aeb1e63caf9d2c7d4/24Q4_LoungerLift_Site_HomepageHero_Desktop_2880x1245_V1_WithNAV.jpg"
          }
          feature={"Elevated"}
          name={"New Lounger Lift"}
          desc={"Time Less sneaker reimagined into the comfort staple yet"}
        />
        <CarouselContainer
          image={
            "https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_1728/cms/6upxsUmrp3cgNr5doQ9pJ1/91cc1f25b6401428071d881a6317194b/24Q3_WoolPiperGo_Site_Homepage_Hero_Desktop_2880x1245_M.png"
          }
          feature={"Classic"}
          name={"the new wool piper go"}
          desc={"The new way to wear your favorite sneaker"}
        />
      </Carousel>
      <h2 id="categories" className="categories-heading">
        Explore Categories
      </h2>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="categories"
      >
        {categories?.map((cat) => (
          <Link to={`/category${cat.href}`} key={cat.name}>
            <div className="category">
              <img src={cat.imageUrl} alt="err" loading="lazy" />
              <div className="category-title">{cat.name}</div>
            </div>
          </Link>
        ))}
      </motion.div>

      <div className="slogan">
        <img
          src="https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_2053/cms/3gaucwAUA2KXTW2QeloccX/02d479630932580eb29bc1329e0ec6fd/24Q3_AugustCore_Statement_Module_Site_Desktop_IMG_2880x720.jpg"
          alt="err"
        />
        <div className="text">
          <h2>We Make Better Things In A Better Way</h2>
          <p>
            By looking to the world’s greatest innovator—Nature—we create shoes
            that deliver unrivaled comfort that you feel good in and feel good
            about.
          </p>
          <span>meteor</span>
        </div>
      </div>

      <h2 className="products-heading">Featured Products</h2>

      <div className="featured-products">
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>

      <div className="contact-us">
        <h2>Hire the developer😁</h2>
        <p>Contact the developer to build MERN stack web applictions.</p>
        <form className="input-container" onSubmit={handleSubmit}>
          <div className="name-email-wrapper">
            <input
              required
              type="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Message here..."
          />
          <button disabled={loading} type="submit">
            {loading ? "Sending..." : "Contact"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
