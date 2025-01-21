import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import '../assets/css/product.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Fetch testimonials data from the API
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('https://theaceworks.com/instruflow/public/api/testimonials');
        const data = await response.json();
        setTestimonials(data.testimonials || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  // Slick slider settings
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <div className="testimonial">
      <h2>We Care About Our Customers' Experience Too</h2>
      <div className="swipe-container">
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div className="swiper-slide" key={testimonial.id}>
              <div className="box">
                <div className="brand-logo">
                  <img src={testimonial.image} alt={`${testimonial.client_name} Logo`} />
                </div>
                <p>{testimonial.text}</p>
                <hr />
                <div className="rating">
                  <span className="brand-name">{testimonial.client_name}</span>
                  <div className="stars">
                    {[...Array(testimonial.ratings)].map((_, index) => (
                      <i key={index} className="fa-solid fa-star"></i>
                    ))}
                    {[...Array(5 - testimonial.ratings)].map((_, index) => (
                      <i key={index} className="fa-regular fa-star"></i>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <button className="swiper-button prev">
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <button className="swiper-button next">
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
