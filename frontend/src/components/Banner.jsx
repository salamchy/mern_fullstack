import { Link } from "react-router-dom";
import BannerImg from "../assets/header.png";

const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h4 className="uppercase">UP TO 20% DISCOUNT ON </h4>
        <h1>Girl's Fashion</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est repudiandae, similique inventore perspiciatis harum accusantium corrupti veniam ex autem quae blanditiis libero at ut?</p>
        <button className="btn"><Link to="/shop">EXPLORE NOW</Link></button>
      </div>

      <div className="header__image">
        <img src={BannerImg} alt="banner img" />
      </div>

    </div>
  )
}
export default Banner