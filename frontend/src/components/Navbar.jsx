import { Link, NavLink } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { GrCart } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import CartModel from "./CartModel";

const Navbar = () => {

  const products = useSelector((state) => state.cart?.products || []);
  const totalItems = products.reduce((total, product) => total + product.quantity, 0);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  }

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">

        {/* logo */}
        <div className="nav__logo">
          <Link to="/">eCommerce</Link>
        </div>

        {/* nav links */}
        <ul className="nav__links ">
          <li><NavLink className="hover:text-primary" to="/">HOME</NavLink></li>
          <li><NavLink className="hover:text-primary" to="/shop">SHOP</NavLink></li>
          <li><NavLink className="hover:text-primary" to="/pages">PAGES</NavLink></li>
          <li><NavLink className="hover:text-primary" to="/contact">CONTACT</NavLink></li>
        </ul>

        {/* nav icons */}
        <div className="nav__icons relative gap-2 sm:gap-5 md:gap-7">
          {/* search icon */}
          <span>
            <Link to="/search">
              <BiSearch />
            </Link>
          </span>

          {/* cart icon */}
          <span>
            <button onClick={handleCartToggle} className="hover:text-primary relative">
              <GrCart />
              <sup className="text-sm absolute -top-3.5 -right-2 px-1.5 text-white rounded-full bg-primary text-center">{totalItems}</sup>
            </button>
          </span>

          <span>
            <Link to="/login">
              <FaRegUser />
            </Link>
          </span>
        </div>

      </nav>

      {
        isCartOpen && <CartModel products={products} isOpen={isCartOpen} onClose={handleCartToggle} />
      }
    </header>
  )
}
export default Navbar;