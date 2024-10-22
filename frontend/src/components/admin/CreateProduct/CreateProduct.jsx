import React, { useState } from "react";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { useProductStore } from "../../../stores/useProductStore";
const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });
  const categories = ["men", "women", "kids", "socks"];
  const { loading, createProduct } = useProductStore();



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = () => {
        setNewProduct({...newProduct, image : reader.result})
      }
      reader.readAsDataURL(file)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      createProduct(newProduct)
    } catch (error) {
      console.log("Error Occured!");
      
    }
  };

  return (
    <div className="create-product">
      <form className="new-product-form" onSubmit={handleSubmit}>
        <h1>Create a new product</h1>
        <label htmlFor="product-name">Product Name</label>
        <input
          id="product-name"
          type="text"
          onChange={(e) => {
            setNewProduct({ ...newProduct, name: e.target.value });
          }}
        />

        <label htmlFor="product-description">Description</label>
        <textarea
          id="product-description"
          onChange={(e) => {
            setNewProduct({ ...newProduct, description: e.target.value });
          }}
        ></textarea>

        <label htmlFor="product-price">Price</label>
        <input
          id="product-price"
          type="number"
          onChange={(e) => {
            setNewProduct({ ...newProduct, price: e.target.value });
          }}
        />

        <label htmlFor="product-category">Category</label>
        <select
          id="product-category"
          onChange={(e) => {
            setNewProduct({ ...newProduct, category: e.target.value });
          }}
        >
          <option value="">Select</option>
          {categories.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>

        <div className="file-input-wrapper">
          <input
            id="product-image"
            type="file"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="product-image" className="upload-label">
            <MdOutlineDriveFolderUpload /> Upload Image
          </label>
        </div>

        {newProduct.image && <span>Image Uploaded Successfully!</span>}

        <button type="submit">
          <AiOutlineProduct />
          {loading ? "Creating..." : "Create a new Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
