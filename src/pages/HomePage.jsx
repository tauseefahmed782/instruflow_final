import React, { useEffect, useState } from 'react';

import Header from '../Component/Header';
import '../assets/css/style.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [scrolling, setScrolling] = useState('no'); // Default to desktop behavior

  useEffect(() => {
    const updateScrolling = () => {
      if (window.innerWidth <= 768) {
        // Mobile view
        setScrolling('yes');
      } else {
        // Desktop view
        setScrolling('no');
      }
    };

    // Set initial scrolling value
    updateScrolling();

    // Add event listener to update on resize
    window.addEventListener('resize', updateScrolling);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateScrolling);
    };
  }, []);

  useEffect(() => {
    // Adding external CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/css/style.css'; // Path to your CSS
    document.head.appendChild(link);

    // Adding external JavaScript for GSAP plugins
    const scrollToPlugin = document.createElement('script');
    scrollToPlugin.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollToPlugin.min.js';
    scrollToPlugin.defer = true;
    document.body.appendChild(scrollToPlugin);

    const scrollTriggerPlugin = document.createElement('script');
    scrollTriggerPlugin.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js';
    scrollTriggerPlugin.defer = true;
    document.body.appendChild(scrollTriggerPlugin);

    // Cleanup on component unmount
    return () => {
      if (link.parentNode) {
        document.head.removeChild(link);
      }
      if (scrollToPlugin.parentNode) {
        document.body.removeChild(scrollToPlugin);
      }
      if (scrollTriggerPlugin.parentNode) {
        document.body.removeChild(scrollTriggerPlugin);
      }
    };
  }, []);

  return (
    <div>
      <Header />
      <iframe
        src="/vite/index.html"
        scrolling={scrolling} // Dynamically set scrolling
        style={{
          width: '100%',
          height: '100vh', // Ensure iframe takes full height minus header
          border: 'none',
          paddingTop: '70px', // Adjust for the header height
          overflow: 'hidden', // Prevent overflow inside iframe
        }}
        title="Vite App"
      />
      <Link to="about" className="btn_go">
        Know More
      </Link>
    </div>
  );
};

export default HomePage;
