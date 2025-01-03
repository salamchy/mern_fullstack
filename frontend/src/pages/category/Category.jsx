import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products.json";
import ProductCards from "../../components/ProductCards";

const Category = () => {
  const { categoryName } = useParams();
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    if (categoryName) {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === categoryName.toLowerCase());
      setFilterProducts(filtered);
    }
  }, [categoryName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style todat!</p>
      </section>

      <div className="section__container">
        <ProductCards products={filterProducts} />
      </div>
    </>
  )
}
export default Category