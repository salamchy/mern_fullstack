import { Link } from "react-router-dom";
import Card1 from "../assets/card-1.png";
import Card2 from "../assets/card-2.png";
import Card3 from "../assets/card-3.png";


const HeroSection = () => {

  const cards = [
    {
      id: 1,
      image: Card1,
      trend: "2024 Trend",
      title: "Womens Shirt",
    },
    {
      id: 2,
      image: Card2,
      trend: "2024 Trend",
      title: "Womens Dresses",
    },
    {
      id: 3,
      image: Card3,
      trend: "2025 Trend",
      title: "Womens Casuals",
    },
  ]
  return (
    <section className="section__container hero__container">
      {
        cards.map((card) => (
          <div key={card.id} className="hero__card" >
            <img src={card.image} alt="card image" />
            <div className="hero__content">
              <p>{card.trend}</p>
              <h4>{card.title}</h4>
              <Link to="#">Discover More</Link>
            </div>
          </div>
        ))
      }
    </section>
  )
}
export default HeroSection