import { Link, useParams } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import Ratings from "../../components/Ratings";

const ProductDetails = () => {

  const { id } = useParams();

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Single Product Page</h2>
        <div className="flex flex-row section__subheader space-x-2 items-center justify-center">
          <span className="hover:text-primary"><Link to="/">HOME</Link></span>
          <RiArrowRightSLine className="mt-1/2" />
          <span className="hover:text-primary"><Link to="/shop">SHOP</Link></span>
          <RiArrowRightSLine className="mt-1/2" />
          <span className="hover:text-primary"></span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">

          {/* product img */}
          <div className="md:w-1/2 w-full">
            <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="rounded-md w-full h-auto" />
          </div>

          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4">Product Name</h3>
            <p className="text-xl text-primary mb-4">$100 <s>$130</s></p>
            <p className="text-gray-400 mb-4">This is a product description.</p>

            {/* additional products */}
            <div>
              <p><strong>Category:</strong> accessroies</p>
              <p><strong>Color:</strong> Yellow</p>

              <div className="flex flex-row items-center">
                <strong>Rating : </strong>
                <Ratings rating={"4"} />
              </div>
            </div>

            <button className="mt-6 px-6 py-3 bg-primary text-white rounded-md">
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* display reviews */}
      <section className="section__container mt-8">
        Reviews Here
      </section>
    </>
  )
}
export default ProductDetails