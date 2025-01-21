import React, { useContext, useEffect } from 'react';
import '../assets/css/product.scss';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import 'aos/dist/aos.css';
import DOMPurify from 'dompurify';
import { PagesContext } from '../pages/PageContext';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ parentPageId }) => {
  const pages = useContext(PagesContext); // Get all pages from the context

  // Recursive function to find all descendants of the parent page
  const findDescendants = (parentId, allPages) => {
    const directChildren = allPages.filter(page => page.parent_id === parentId);
    const allDescendants = [...directChildren];


    return allDescendants;
  };

  // Get all related products including descendants
  const relatedProducts = findDescendants(parentPageId, pages);

  // Check if related products are empty and find parent products if so
  const parentProducts = parentPageId ? findDescendants(pages.find(page => page.id === parentPageId)?.parent_id, pages) : [];

  const productsToDisplay = relatedProducts.length > 0 ? relatedProducts : parentProducts;

  useEffect(() => {
    let swiperInstance;
  
    // Initialize Swiper
    const swiperContainer = document.querySelector('.product-swiper');
    if (swiperContainer) {
      swiperInstance = new Swiper(swiperContainer, {
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
  
      // Auto slide functionality
      let intervalId = setInterval(() => {
        swiperInstance.slideNext();
      }, 3000);
  
      // Pause on hover
      swiperContainer.querySelector('.swiper-wrapper').addEventListener('mouseenter', () => {
        clearInterval(intervalId);
      });
      swiperContainer.querySelector('.swiper-wrapper').addEventListener('mouseleave', () => {
        intervalId = setInterval(() => {
          swiperInstance.slideNext();
        }, 3000);
      });
  
      // Cleanup function
      return () => {
        if (swiperInstance) {
          swiperInstance.destroy(true, true);
        }
        clearInterval(intervalId); // Clear interval on unmount
      };
    } else {
      console.warn("Swiper container not found");
    }
  }, [parentPageId]); // Re-run effect when parentPageId changes
  return (
    <div>
      <section className="sub-product" style={{paddingTop:'0px'}}>
        <div className="title">
          <div className="sub">
            <hr />
            <span>All Products</span>
          </div>
          <h2>Related Products</h2>
        </div>

        <div className="swipe-container">
          <div className="product-swiper swiper">
            <div className="swiper-wrapper">
              {productsToDisplay.length > 0 ? (
                productsToDisplay.map((product, index) => (
                  <div className="swiper-slide" key={index}>
                
                    <div className="box" style={{
                      backgroundImage: `url('${product.image}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '300px',
                    }}>
                      <h3>{product.title}</h3>
                      <div className='swiper_text'
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(product.description),
                        }}
                      />
                      <Link to={`/${product.slug}`} className="learn-more">
                        Read more
                      </Link>
                      
                    </div>
                  </div>
                ))
              ) : (
                <p>No related products found.</p>
              )}
            </div>
          </div>

          <div className="product-swiper-button swiper-button prev">
            <i className="fa-solid fa-angle-left"></i>
          </div>
          <div className="product-swiper-button swiper-button next">
            <i className="fa-solid fa-angle-right"></i>
          </div>

          <div className="swiper-pagination"></div>
        </div>
      </section>
    </div>
  );
}

export default RelatedProducts;
