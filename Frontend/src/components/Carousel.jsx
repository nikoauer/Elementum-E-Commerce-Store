import priceMatch from "../images/priceMatchSlider.png"
import salewaSlider from "../images/salewaSlider.png"
import freeShipping from "../images/freeShippingSlider.png"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel = () => {

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3000,
    };

  return (
    <div>
        <Slider {...settings}>
          <img src={salewaSlider} alt="New Salew in stock" />
          <img src={priceMatch} alt="Price match competitors" />
          <img src={freeShipping} alt="Free shipping for a limited time" />
        </Slider>
      </div>
  )
}


export default Carousel