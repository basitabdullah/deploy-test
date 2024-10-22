import { useCartStore } from "../../stores/useCartStore";
import "./Product.scss";
const Product = ({ product }) => {
  const {getCartItems , addToCart} = useCartStore()

  return (
      <div className="product-featured" key={product._id}>
        <img src={product.image} alt="err" />
        <div className="details">
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <button onClick={()=>addToCart(product)}>Add to cart</button>
        </div>
      </div>
  );
};

export default Product;
