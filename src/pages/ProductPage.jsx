import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/product.scss';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import 'aos/dist/aos.css';
import AOS from 'aos';
import axios from 'axios';
import anime from 'animejs/lib/anime.es.js';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import SectionOne from '../Component/ProductPage/SectionOne';
import SectionTwo from '../Component/ProductPage/SectionTwo';
import RelatedProducts from '../Component/RelatedProducts';
import CallToAction from '../Component/ProductPage/CallToAction';
import { PagesContext } from './PageContext';

const ProductPage = () => {
  const { slug } = useParams(); // Get slug from the URL
  const [sections, setSections] = useState([]); // State to store the fetched sections
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [currentPage, setCurrentPage] = useState(null); // State for current page based on slug

  const pages = useContext(PagesContext); // Use the pages context

  // Function to recursively find the parent chain
  const findParentChain = (page) => {
    const chain = [];
    let current = page;

    while (current) {
      chain.unshift(current); // Add the current page to the start of the chain
      current = pages.find((p) => p.id === current.parent_id); // Find the parent page
    }

    return chain;
  };

  useEffect(() => {
    // Fetch sections based on the slug
    axios
      .get(`https://theaceworks.com/instruflow/public/api/sections?slug=${slug}`)
      .then((response) => {
        if (response.data.sections && response.data.sections.length > 0) {
          setSections(response.data.sections); // Set the fetched sections data
        } else {
          console.warn('No sections found for the provided slug');
          setSections([]); // Handle no sections found
        }
      })
      .catch((error) => {
        console.error('Error fetching section data:', error);
        setError('Failed to fetch section data');
      })
      .finally(() => {
        setLoading(false); // Set loading to false once fetching is complete
      });

    // Initialize AOS (Animation On Scroll)
    AOS.init();

    // Set current page based on slug only if pages is not empty
    if (pages && pages.length > 0) {
      const foundPage = pages.find((page) => page.slug === slug);
      setCurrentPage(foundPage); // Set the currentPage state
    }
  }, [slug, pages]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Add a condition to check if currentPage is valid before rendering components that use it
  if (!currentPage) return <div>Page not found</div>;

  // Get the full parent chain for the current page
  const parentChain = currentPage ? findParentChain(currentPage) : [];

  return (
    <div>
      <Header />
      
      {/* Map through sections and render the appropriate component for each */}
      {sections.map((section, index) => (
        <div key={index}>
          {section.video_link || section.image ? (
            <SectionOne 
              sectionData={section} 
              currentPage={currentPage} 
              parentChain={parentChain} // Pass the parentChain to SectionOne
            /> // Pass section data to SectionOne
          ) : (
            <SectionTwo sectionData={section} /> // Pass section data to SectionTwo
          )}
        </div>
      ))}
      
      {currentPage && <RelatedProducts parentPageId={currentPage.id} />}

      <CallToAction />
      <Footer />
    </div>
  );
};

export default ProductPage;
