import { useEffect } from "react";
import "./Category.scss";
import { useProductStore } from "../../stores/useProductStore";
import { useParams } from "react-router-dom";
import MinLoader from "../../components/Loaders/minLoader/MinLoader";
import { motion } from "framer-motion";
import { useCartStore } from "../../stores/useCartStore";
const Category = () => {
  const { fetchProductsByCategory, loading, products } = useProductStore();
  const { category } = useParams();
  const { addToCart} = useCartStore()

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="category-page"
    >
      <h1>{category}</h1>
      {products.length === 0 && <p>No products found !</p>}
      {loading ? (
        <MinLoader />
      ) : (
        <div className="product-container">
          {products?.map((i) => (
            <div className="product" key={i._id}>
              <img src={i.image} alt="err" />
              <div className="details">
                <h2>{i.name}</h2>
                <p>${i.price}</p>
                <button className="view" onClick={()=>addToCart(i)}>Buy</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Category;
