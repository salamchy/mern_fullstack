import { useEffect, useState } from "react";
import productsData from "../../data/products.json";
import ProductCards from "../../components/ProductCards";
import ShopFiltering from "../../components/ShopFiltering";

const filters = {
  category: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  colors: ["all", "black", "red", "blue", "gold", "silver", "green"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ]
}

const Shop = () => {

  const [products, setProducts] = useState(productsData);
  const [filterState, setFilterState] = useState({
    category: "all",
    color: "all",
    priceRange: ""
  });

  //filtering products function
  const applyFilter = () => {
    let filteredProducts = productsData;

    //filter by category
    if (filterState.category && filterState.category !== "all") {
      filteredProducts = filteredProducts.filter(product => product.category === filterState.category);
    }

    //filter by color
    if (filterState.color && filterState.color !== "all") {
      filteredProducts = filteredProducts.filter(product => product.color === filterState.color);
    }

    //filter by price range
    if (filterState.priceRange) {
      const [minPrice, maxPrice] = filterState.priceRange.split("-").map(Number);
      filteredProducts = filteredProducts.filter(product => {
        if (maxPrice === Infinity) {
          return product.price >= minPrice;
        }
        return product.price >= minPrice && product.price <= maxPrice;
      });
    }

    setProducts(filteredProducts);
  };

  useEffect(() => {
    applyFilter();
  }, [filterState]);

  //clear the filters
  const clearFilter = () => {
    setFilterState({
      category: "all",
      color: "all",
      price: ""
    });
  }

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Shop Page</h2>
        <p className="section__subheader">
          Discover the hottest picks: Elevate your style with our curated collection of trending women's fashion product.
        </p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* left side */}
          <ShopFiltering
            filters={filters}
            filterState={filterState} setFilterState={setFilterState}
            clearFilter={clearFilter}
          />

          {/* right side */}
          <div>
            <h3 className="text-xl font-medium mb-4">Products Available: {products.length}</h3>
            <ProductCards products={products} />
          </div>
        </div>

      </section>
    </>
  )
}
export default Shop