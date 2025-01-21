import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the slug from URL
import axios from 'axios';
import '../assets/css/product.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { PagesContext } from './PageContext';

const CommonPage = () => {
  const { slug } = useParams(); // Get slug from the URL
  const [sections, setSections] = useState([]);
  const pages = useContext(PagesContext); // Use the pages context

  // Find the page based on the slug
  const currentPage = pages.find((page) => page.slug === slug);

  useEffect(() => {
    if (slug !== 'contact') {
      // Fetch sections based on the slug only if slug is not 'contact'
      axios
        .get(`https://theaceworks.com/instruflow/public/api/sections?slug=${slug}`)
        .then((response) => {
          if (response.data.sections && response.data.sections.length > 0) {
            setSections(response.data.sections); // Set the fetched sections data
          } else {
            setSections([]); // Handle empty state
          }
        })
        .catch((error) => {
          console.error('Error fetching section data:', error);
        });

      // Initialize AOS (Animation On Scroll)
      AOS.init();
    }
  }, [slug]);
  return (
    <div>

    </div>
  )
}

export default CommonPage