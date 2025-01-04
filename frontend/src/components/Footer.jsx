import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Instagram1 from "../assets/instagram-1.jpg";
import Instagram2 from "../assets/instagram-2.jpg";
import Instagram3 from "../assets/instagram-3.jpg";
import Instagram4 from "../assets/instagram-4.jpg";
import Instagram5 from "../assets/instagram-5.jpg";
import Instagram6 from "../assets/instagram-6.jpg";

const Footer = () => {
  return (
    <>
      <footer className="section__container footer__container">
        <div className="footer__col">
          <h4>CONTACT INFO</h4>
          <p className="flex items-center space-x-2">
            <span><FaLocationDot /></span>
            Ktm, Tokha-10 Nepal
          </p>

          <p className="flex items-center space-x-2">
            <span><IoIosMail /></span>
            chaudharysm00@gmail.com
          </p>

          <p className="flex items-center space-x-2">
            <span><FaPhoneAlt /></span>
            9800997070
          </p>
        </div>

        <div className="footer__col">
          <h4>COMPANY</h4>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">About Us</NavLink>
          <NavLink to="/">Work With Us</NavLink>
          <NavLink to="/">Our Blogs</NavLink>
        </div>

        <div className="footer__col">
          <h4>USEFUL LINK</h4>
          <NavLink to="/">Help</NavLink>
          <NavLink to="/">Men</NavLink>
          <NavLink to="/">Women</NavLink>
          <NavLink to="/">Dresses</NavLink>
        </div>

        <div className="footer__col">
          <h4>Instagram</h4>
          <div className="instagram__grid">
            <img src={Instagram1} alt="" />
            <img src={Instagram2} alt="" />
            <img src={Instagram3} alt="" />
            <img src={Instagram4} alt="" />
            <img src={Instagram5} alt="" />
            <img src={Instagram6} alt="" />
          </div>
        </div>
      </footer>

      <div className="footer__bar">
        <p>Copyright &copy; 2025 All Rights Reserved </p>
      </div>
    </>
  )
}
export default Footer