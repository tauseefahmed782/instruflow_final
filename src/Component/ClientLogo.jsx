import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ClientLogo.css'; // Optional for custom styles

const ClientLogo = () => {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchLogos = async () => {
      try {
        const response = await fetch('https://theaceworks.com/instruflow/public/api/installations');
        const data = await response.json();
        if (data && data.installations) {
          setLogos(data.installations);
        }
      } catch (error) {
        console.error('Error fetching installations:', error);
      }
    };

    fetchLogos();
  }, []);

  // Slick slider settings
  const settings = {
    infinite: true, // Infinite scrolling
    slidesToShow: 5, // Number of logos displayed per row
    slidesToScroll: 1, // Number of logos to scroll at a time
    autoplay: true, // Autoplay slider
    autoplaySpeed: 3000, // Delay between slides in milliseconds
    arrows: false, // Disable navigation arrows
    dots: false, // Disable pagination dots
    responsive: [
      {
        breakpoint: 1024, // Large screens
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 768, // Medium screens
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 640, // Small screens
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <div>
      <section className="brands">
        <h2>
          <span>Instruflow installations</span>
          <hr />
        </h2>
        {logos.length > 0 ? (
          <Slider {...settings}>
            {logos.map((logo) => (
              <div key={logo.id} className="brand-slide">
                <img
                  src={logo.images}
                  alt={`Brand Logo ${logo.id}`}
                  className="brand-logo"
                  style={{ width: '100px' }}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <p>Loading logos...</p>
        )}
      </section>
    </div>
  );
};

export default ClientLogo;
