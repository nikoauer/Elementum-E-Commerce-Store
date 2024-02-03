import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text, colour }) => {
  const clampedValue = Math.min(Math.max(value, 0), 5); // Ensure value is between 0 and 5
  const fullStars = Math.floor(clampedValue);
  const hasHalfStar = clampedValue - fullStars > 0.5;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className={`text-${colour} ml-1`} />
      ))}

      {hasHalfStar && <FaStarHalfAlt className={`text-${colour} ml-1`} />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
        <FaRegStar key={index} className={`text-${colour} ml-1`} />
      ))}

      {text && <span className={`rating-text ml-2 text-${colour}`}>{text}</span>}
    </div>
  );
};

Ratings.defaultProps = {
  colour: "yellow-500",
};

export default Ratings;
