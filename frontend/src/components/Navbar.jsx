import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { GrCart } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CartModel from "./CartModel";
import avatarImg from "../assets/avatar.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logOut } from "../redux/features/auth/authSlice";

const Navbar = () => {

  const products = useSelector((state) => state.cart?.products || []);
  const totalItems = products.reduce((total, product) => total + product.quantity, 0);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  }

  //show user if logged in
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth) || {};
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  // dropdown menu
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen)
  }

  //admin drop down
  const adminDropDownMenus = [
    {
      label: "Dashboard",
      path: "/dashboard/admin"
    },
    {
      label: "Manage Items",
      path: "/dashboard/manage-products"
    },
    {
      label: "All Orders",
      path: "/dashboard/manage-orders"
    },
    {
      label: "Add New Post",
      path: "/dashboard/add-new-post"
    },
  ]


  //user drop down
  const userDropDownMenus = [
    {
      label: "Dashboard",
      path: "/dashboard"
    },
    {
      label: "Profile",
      path: "/dashboard/profile"
    },
    {
      label: "Payments",
      path: "/dashboard/payments"
    },
    {
      label: "Orders",
      path: "/dashboard/orders"
    },
  ]

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logOut());
      navigate("/");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  }

  const dropDownMenus = user?.role === "admin" ? [...adminDropDownMenus] : [...userDropDownMenus]

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
          <li><NavLink className="hover:text-primary" to="/about">ABOUT US</NavLink></li>
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
            {
              user && user ? (<><img onClick={handleDropDownToggle} className="size-6 rounded-full cursor-pointer" src={user?.profileImage || avatarImg} alt="" />
                {
                  isDropDownOpen && (
                    <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <ul className="font-medium space-y-4 p-2">
                        {dropDownMenus.map((menu, index) => (
                          <li key={index}>
                            <Link onClick={() => setIsDropDownOpen(false)} className="dropdown-items" to={menu.path}>{menu.label}</Link>
                          </li>
                        ))}
                        <li><Link onClick={handleLogout} className="dropdown-items">Logout</Link></li>
                      </ul>
                    </div>
                  )
                }
              </>) : (<Link to="/login">
                <FaRegUser />
              </Link>)
            }

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