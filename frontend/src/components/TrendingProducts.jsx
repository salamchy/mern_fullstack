import ProductCards from "./ProductCards";
import products from "../data/products.json";
import { useState } from "react";

const TrendingProducts = () => {

  const [visibleProducts, setVisibleProducts] = useState(8);

  const loadMoreProducts = () => {
    setVisibleProducts((prevValue) => prevValue + 4);
  };

  return (
    <section className="section__container product__contain">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis rerum aperiam illum repudiandae molestiae eos nisi.</p>

      {/* products card */}
      <ProductCards products={products.slice(0, visibleProducts)} />

      {/* load more product button */}
      <div className="product__btn">
        {
          visibleProducts < products.length && (
            <button className="btn" onClick={loadMoreProducts}>Load More</button>
          )
        }
      </div>


    </section>
  )
}
export default TrendingProducts