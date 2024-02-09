import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text }) => {
  const clampedValue = Math.min(Math.max(value, 0), 5);
  const fullStars = Math.floor(clampedValue);
  const hasHalfStar = clampedValue - fullStars > 0.5;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className={'text-yellow-500 ml-1'} />
      ))}

      {hasHalfStar && <FaStarHalfAlt className={'text-yellow-500 ml-1'} />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
        <FaRegStar key={index} className={'text-yellow-500 ml-1'} />
      ))}

      {text && <span className={'rating-text ml-2 text-gray-800'}>{text}</span>}
    </div>
  );
};

export default Ratings;
