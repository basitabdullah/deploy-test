
const CarouselContainer = ({image,name,feature,desc}) => {
  return (
    <div className="carousel-image-container">
          <img src={image} />
          <div className="description">
            <div className="top">
              <p className="product-name">{name}</p>
              <div className="product-feature">
                <p className="classic">{feature}</p>
                <p className="nature">by nature</p>
              </div>
            </div>
            <div className="bottom">
              <p>{desc}</p>
              <a href="#categories" className="shop-now">Shop Now</a>
            </div>
          </div>
        </div>
  )
}

export default CarouselContainer