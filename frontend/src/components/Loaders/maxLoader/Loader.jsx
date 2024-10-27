import "./loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <span className="loader"></span>
      <p className="alert">
        <span>Alert :</span> This web application is deployed on a{" "}
        <span>(free-tier)</span> of render deployments so the initial load can
        take upto <span>90-100</span> seconds.
      </p>
    </div>
  );
};

export default Loader;
