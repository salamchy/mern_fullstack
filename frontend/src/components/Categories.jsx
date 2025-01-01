import { Link } from "react-router-dom";
import Category1 from "../assets/category-1.jpg";
import Category2 from "../assets/category-2.jpg";
import Category3 from "../assets/category-3.jpg";
import Category4 from "../assets/category-4.jpg";


const Categories = () => {
  const categories = [
    { name: "Accessories", path: "accessories", image: Category1 },
    { name: "Dress Collection", path: "dress", image: Category2 },
    { name: "Jewellery", path: "jewellery", image: Category3 },
    { name: "Cosmetics", path: "cosmetics", image: Category4 }
  ]

  return (
    <div className="product__grid">
      {
        categories.map((category) => (
          <Link to={`/categories/${category.path}`} className="categories__card">
            <img src={category.image} alt="category image" />
            <h4>{category.name}</h4>
          </Link>
        ))
      }
    </div>
  )
}
export default Categories