import React, { useContext, useEffect } from 'react';
import '../assets/css/style.scss';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import Swiper from 'swiper';
import DOMPurify from 'dompurify';
import { PagesContext } from './PageContext'; // Import the PagesContext
import 'swiper/css';
import 'swiper/css/pagination';
import black from '../assets/black.jpg';
import { Navigation, Pagination } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ClientLogo from '../Component/ClientLogo';
import { Link } from 'react-router-dom';
import Testimonials from '../Component/Testimonials';

const About = () => {
  const pages = useContext(PagesContext); // Use the PagesContext to get the pages data

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      offset: 0,
      delay: 0,
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });

    // Initialize Swipers after DOM is ready
    const initializeSwipers = () => {
      const productSwiper = new Swiper('.product-swiper', {
        loop: true,
        navigation: {
          nextEl: '.product-swiper-button.next',
          prevEl: '.product-swiper-button.prev',
        },
        slidesPerView: 1,
        spaceBetween: 25,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
        modules: [Navigation, Pagination],
        breakpoints: {
          1200: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
        },
      });

      let productSwiperInterval = setInterval(() => {
        productSwiper.slideNext();
      }, 3000);

      const productSwipeContainer = document.querySelector('.product-swiper .swiper-wrapper');
      if (productSwipeContainer) {
        productSwipeContainer.addEventListener('mouseenter', () => clearInterval(productSwiperInterval));
        productSwipeContainer.addEventListener('mouseleave', () => {
          productSwiperInterval = setInterval(() => {
            productSwiper.slideNext();
          }, 3000);
        });
      }

      const testimonialSwiper = new Swiper('.tswiper', {
        loop: true,
        navigation: {
          nextEl: '.tswiper-button.next',
          prevEl: '.tswiper-button.prev',
        },
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          1200: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          820: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          550: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
      });

      let testimonialSwiperInterval = setInterval(() => {
        testimonialSwiper.slideNext();
      }, 3000);

      const testimonialSwipeContainer = document.querySelector('.tswiper .swiper-wrapper');
      if (testimonialSwipeContainer) {
        testimonialSwipeContainer.addEventListener('mouseenter', () => clearInterval(testimonialSwiperInterval));
        testimonialSwipeContainer.addEventListener('mouseleave', () => {
          testimonialSwiperInterval = setInterval(() => {
            testimonialSwiper.slideNext();
          }, 3000);
        });
      }

      return () => {
        clearInterval(productSwiperInterval);
        clearInterval(testimonialSwiperInterval);
      };
    };

    // Wait for DOMContentLoaded before initializing Swipers
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      initializeSwipers();
    } else {
      window.addEventListener('DOMContentLoaded', initializeSwipers);
    }

    return () => {
      window.removeEventListener('DOMContentLoaded', initializeSwipers);
    };
  }, []);

  return (
    <div>
      <Header />
      <section className="title-about">
        <h2>Lab & Industrial Products</h2>
      </section>

      <section className="product" style={{ margin: '50px 0px' }}>
        <div className="swipe-container" data-aos="fade-up" data-aos-anchor-placement="top-center">
          <div className="product-swiper swiper">
            <div className="swiper-wrapper">
              {/* Map through the pages to create swiper slides */}
              {pages.length > 0 ? (
                pages.map((page, index) => (
                  <div className="swiper-slide" key={index}>
                    <div className="info">
                      <h3>{page.title}</h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(page.description),
                        }}
                      />
                      <Link to={`/${page.slug}`} className="learn-more">
                        Read more
                      </Link>
                    </div>
                    <img src={page.image_url || black} alt={page.title} /> {/* Add fallback image */}
                  </div>
                ))
              ) : (
                <p>No products available.</p>
              )}
            </div>
          </div>

          {/* Swiper navigation buttons */}
          <div className="product-swiper-button swiper-button prev">
            <i className="fa-solid fa-angle-left"></i>
          </div>
          <div className="product-swiper-button swiper-button next">
            <i className="fa-solid fa-angle-right"></i>
          </div>

          {/* Swiper pagination */}
          <div className="swiper-pagination"></div>
        </div>
        <hr />
      </section>
      <Testimonials />
      <ClientLogo />
      <Footer />
    </div>
  );
};

export default About;
