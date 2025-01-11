import { Link, useParams } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import Ratings from "../../components/Ratings";
import { useDispatch } from "react-redux";
import { useFetchProductByIdQuery } from "../../redux/features/products/productsApi";
import { addToCart } from "../../redux/features/cart/cartSlice";
import ReviewsCard from "./ReviewsCard";

const ProductDetails = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);

  const singleProduct = data?.product || {};

  const productReviews = data?.reviews || [];

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading product details</p>

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Single Product Page</h2>
        <div className="flex flex-row section__subheader space-x-2 items-center justify-center">
          <span className="hover:text-primary"><Link to="/">HOME</Link></span>
          <RiArrowRightSLine className="mt-1/2" />
          <span className="hover:text-primary"><Link to="/shop">SHOP</Link></span>
          <RiArrowRightSLine className="mt-1/2" />
          <span className="hover:text-primary">{singleProduct.name}</span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">

          {/* product img */}
          <div className="md:w-1/2 w-full">
            <img src={singleProduct?.image} alt="" className="rounded-md w-full h-auto" />
          </div>

          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4">{singleProduct?.name}</h3>
            <p className="text-xl text-primary mb-4">{singleProduct.price}
              {singleProduct?.oldPrice && <s className="ml-2">${singleProduct?.oldPrice}</s>}
            </p>
            <p className="text-gray-400 mb-4">{singleProduct?.description}</p>

            {/* additional products */}
            <div className="flex flex-col space-y-2">
              <p><strong>Category:</strong> {singleProduct?.category}</p>
              <p><strong>Color:</strong> {singleProduct?.color}</p>

              <div className="flex flex-row items-center">
                <strong>Rating : </strong>
                <Ratings rating={singleProduct?.rating} />
              </div>
            </div>

            <button onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(singleProduct);
            }} className="mt-6 px-6 py-3 bg-primary text-white rounded-md">
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* display reviews */}
      <section className="section__container mt-8">
        <ReviewsCard productReviews={productReviews} />
      </section>
    </>
  )
}
export default ProductDetails