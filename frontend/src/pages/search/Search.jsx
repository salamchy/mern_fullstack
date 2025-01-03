import { useState } from "react";
import ProductsData from "../../data/products.json";
import ProductCards from "../../components/ProductCards";

const Search = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const searchHandle = () => {
    const query = searchQuery.toLowerCase();

    const filtered = ProductsData.filter(product => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query));

    setFilteredProducts(filtered);
  }

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Search Products</h2>
        <p className="section__subheader">Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style todat!</p>
      </section>

      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search__bar w-full max-w-4xl p-2 border rounded"
            type="text" placeholder="Search for Products outline-none"
          />

          <button onClick={searchHandle} className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded">Search</button>
        </div>

        <ProductCards products={filteredProducts} />
      </section>
    </>
  )
}
export default Search