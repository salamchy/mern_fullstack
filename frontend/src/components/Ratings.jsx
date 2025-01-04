import { useState } from "react";
import { CiStar } from "react-icons/ci";

const Ratings = ({ rating }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleMouseEnter = (value) => {
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`cursor-pointer ${i <= (hoveredRating || rating) ? "text-yellow-500" : "text-gray-400"
          }`}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
      >
        <CiStar size={30} />
      </span>
    );
  }

  return (
    <div>
      <div className="product__rating flex items-center justify-center space-x-1">{stars}</div>
    </div>
  );
};

export default Ratings;

