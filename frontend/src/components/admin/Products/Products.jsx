import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import "./Products.scss";
import { useProductStore } from "../../../stores/useProductStore";
import MinLoader from "../../Loaders/minLoader/MinLoader";
const Products = () => {
  const {toggleFeaturedProduct, fetchAllProducts, products, loading, deleteProduct } =
    useProductStore();



  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <>
      {loading ? (
        <MinLoader />
      ) : (
        <div className="product-table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Category</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="product-info">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="product-details">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-description">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <button className="featured-button" onClick={()=>toggleFeaturedProduct(product._id)}>
                      {product.isFeatured ? <FaStar /> : <IoClose />}
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Products;
