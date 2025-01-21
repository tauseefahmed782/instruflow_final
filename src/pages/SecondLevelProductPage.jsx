import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to extract slug
import '../assets/css/product.scss';
import SectionOne from '../Component/ProductPage/SectionOne';
import SectionTwo from '../Component/ProductPage/SectionTwo';
import RelatedProducts from '../Component/RelatedProducts';
import CallToAction from '../Component/ProductPage/CallToAction';
import axios from 'axios';

const SecondLevelProductPage = () => {
  const { slug } = useParams(); // Get slug from the URL
  const [sectionData, setSectionData] = useState(null);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const response = await axios.get(`https://your-api-url.com/sections/${slug}`);
        setSectionData(response.data);
      } catch (error) {
        console.error('Error fetching section data:', error);
      }
    };

    fetchSectionData();
  }, [slug]);

  if (!sectionData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SectionOne title={sectionData.title} description={sectionData.description} video_link={sectionData.video_link} />
      <SectionTwo />
      <RelatedProducts />
      <CallToAction />
    </div>
  );
};

export default SecondLevelProductPage;
