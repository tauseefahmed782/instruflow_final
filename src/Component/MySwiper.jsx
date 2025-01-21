import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const MySwiper = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('https://theaceworks.com/instruflow/public/api/installations');
        const data = await response.json();
        console.log('API Response:', data); // Debugging API response
        if (data.success) {
          setTestimonials(data.data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="testimonials-slider" style={{ margin: '0 auto', width: '80%' }}>
      {testimonials.length === 0 ? (
        <p>Loading testimonials...</p>
      ) : (
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div className="slick-slide" key={testimonial.id}>
              <div className="box" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
                <div className="brand-logo" style={{ marginBottom: '10px', textAlign: 'center' }}>
                  <img
                    src={testimonial.image || 'https://via.placeholder.com/80'}
                    alt={`${testimonial.client_name || 'Client'} Logo`}
                    style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                  />
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>{testimonial.text}</p>
                <hr />
                <div className="rating" style={{ textAlign: 'center' }}>
                  <span className="brand-name" style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                    {testimonial.client_name}
                  </span>
                  <div className="stars">
                    {[...Array(testimonial.ratings || 0)].map((_, index) => (
                      <i key={index} className="fa-solid fa-star" style={{ color: '#f39c12', margin: '0 2px' }}></i>
                    ))}
                    {[...Array(5 - (testimonial.ratings || 0))].map((_, index) => (
                      <i key={index} className="fa-regular fa-star" style={{ color: '#ccc', margin: '0 2px' }}></i>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default MySwiper;
