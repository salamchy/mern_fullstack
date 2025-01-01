import { Link, NavLink } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { GrCart } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">

        {/* logo */}
        <div className="nav__logo">
          <Link to="/">eCommerce</Link>
        </div>

        {/* nav links */}
        <ul className="nav__links">
          <li><NavLink to="/">HOME</NavLink></li>
          <li><NavLink to="/shop">SHOP</NavLink></li>
          <li><NavLink to="/pages">PAGES</NavLink></li>
          <li><NavLink to="/contact">CONTACT</NavLink></li>
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
            <button className="hover:text-primary relative">
              <Link to="/cart">
                <GrCart />
              </Link>
              <sup className="text-sm absolute -top-3.5 -right-2 px-1.5 text-white rounded-full bg-primary text-center">3</sup>
            </button>
          </span>

          <span>
            <Link to="/login">
              <FaRegUser />
            </Link>
          </span>
        </div>

      </nav>
    </header>
  )
}
export default Navbar;