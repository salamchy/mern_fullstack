
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import Ratings from "./Ratings";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";

const ProductCards = ({ products }) => {

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
      {
        products.map((product, index) => (
          <div key={index} className="product__card">
            <div className="relative">
              <Link to={`/shop/${product._id}`}>
                <img src={product.image} alt="product image" className="max-h-96 md:h-64 w-full object-cover hover:scale-110 transition-all duration-300" />
              </Link>

              <div className="hover:block absolute top-3 right-3">
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product)
                }}><MdShoppingCart className="w-9 h-9 hover:text-primary bg-primary rounded-full p-1.5 text-white hover:bg-transparent" /></button>
              </div>
            </div>

            {/* products descripion */}
            <div className="product__card__content">
              <h4>{product.name}</h4>
              <p>$: {product.price} {product.oldPrice ? <s>${product?.oldPrice}</s> : null}</p>

              {/* rating component */}
              <Ratings rating={product.rating} />
            </div>
          </div>
        ))
      }
    </div>
  )
}
export default ProductCards