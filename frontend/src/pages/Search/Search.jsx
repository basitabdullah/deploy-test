import "./Search.scss";
import Product from "../../components/Product/Product";
import { useEffect, useState } from "react";
import { IoReturnUpBack, IoReturnUpForward } from "react-icons/io5";
import MetaData from "../../components/MetaData.jsx";
import { motion } from "framer-motion";
import { useProductStore } from "../../stores/useProductStore.js";
import Loader from "../../components/Loaders/minLoader/MinLoader.jsx";
const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxprice, setMaxprice] = useState(120);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const { loading, fetchAllProducts, products, searchProducts } =
    useProductStore();

  const isPrevPage = page > 1;
  const isNextPage = page < 4;
  const categories = [
    {
      cat: "men",
      name: "Men",
    },
    {
      cat: "women",
      name: "Women",
    },
    {
      cat: "kids",
      name: "Kids",
    },
    {
      cat: "socks",
      name: "Socks",
    },
  ];

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  useEffect(() => {
    searchProducts(search, sort, maxprice, category);
  }, [search, sort, maxprice, category]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="search"
    >
      <MetaData title={"Meteor | Products-Search"} />

      <div className="filters">
        <h4>Filters</h4>
        <label>Sort</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="none">None</option>
          <option value="asc">Price(Low to High)</option>
          <option value="desc">Price(High to Low)</option>
        </select>
        <label>Max price : {maxprice || ""}</label>
        <input
          value={maxprice}
          min={120}
          max={500}
          type="range"
          onChange={(e) => setMaxprice(Number(e.target.value))}
        />
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          {categories.map((i) => (
            <option value={i.cat} key={i.cat}>
              {i.name}
            </option>
          ))}
        </select>
      </div>
      <div className="products">
        <h1>Products</h1>
        <input
          type="text"
          value={search}
          placeholder="Search by name..."
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading ? (
          <Loader />
        ) : (
          <div className="products-container">
            {!products || products.length === 0 ? (
              <p>No Products Found ⚠️</p>
            ) : (
              products.map((product) => (
                <Product product={product} key={product._id} />
              ))
            )}
          </div>
        )}

        <div className="pages">
          <button
            disabled={!isPrevPage}
            onClick={(e) => setPage((prev) => prev - 1)}
          >
            <IoReturnUpBack />
          </button>
          <span>
            {page} of {4}
          </span>
          <button
            disabled={!isNextPage}
            onClick={(e) => setPage((prev) => prev + 1)}
          >
            <IoReturnUpForward />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Search;
