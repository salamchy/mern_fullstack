import { BsTruck } from "react-icons/bs";
import { LuCircleDollarSign } from "react-icons/lu";
import { BiSolidUserVoice } from "react-icons/bi";

const PromoBanner = () => {
  return (
    <div className="section__container banner__container">
      <div className="banner__card">
        <span>
          <BsTruck />
        </span>
        <h4>Free Delivery</h4>
        <p>Offers convenience and the ability to shop from anywhere, anytime.</p>
      </div>
      <div className="banner__card">
        <span>
          <LuCircleDollarSign />
        </span>
        <h4>100% Moneyback Gurantee</h4>
        <p>Ecommerce have a review system where customers can share feedback.</p>
      </div>
      <div className="banner__card">
        <span>
          <BiSolidUserVoice />
        </span>
        <h4>Strong Support</h4>
        <p>Offers convenience and the ability to shop from anywhere, anytime.</p>
      </div>
    </div>
  )
}
export default PromoBanner