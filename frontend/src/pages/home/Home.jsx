import Banner from "../../components/Banner";
import Categories from "../../components/Categories";
import HeroSection from "../../components/HeroSection";
import TrendingProducts from "../../components/TrendingProducts";
import DealSection from "../../components/DealsSection";
import PromoBanner from "../../components/PromoBanner";
import Blogs from "../../components/Blogs";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <HeroSection />
      <TrendingProducts />
      <DealSection />
      <PromoBanner />
      <Blogs />
    </div>
  )
}
export default Home