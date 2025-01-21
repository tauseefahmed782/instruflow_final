import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the slug from URL
import axios from 'axios';
import '../assets/css/product.scss';
import '../assets/css/sub-product.css'; 
import DOMPurify from 'dompurify';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import RelatedProducts from '../Component/RelatedProducts';
import { PagesContext } from './PageContext';
import Breadcrumbs from '../Component/MainProduct/BreadCrumbs';
import Contact from './Contact';
import SectionOne from '../Component/ProductPage/SectionOne';
import SectionTwo from '../Component/ProductPage/SectionTwo';
import SectionSubOne from '../Component/SubProductPage/SectionSubOne';
import SectionSubTwo from '../Component/SubProductPage/SectionSubTwo';
import About from './About';
import Testimonials from '../Component/Testimonials';
import ClientLogo from '../Component/ClientLogo';


// Loader Component
const Loader = () => (
  <div className="loader">
    <div className="spinner"></div>
  </div>
);

// MainProductPage component
const MainProductPage = () => {
  const { slug } = useParams(); // Get slug from the URL
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const pages = useContext(PagesContext); // Use the pages context

  // Find the page based on the slug
  const currentPage = pages.find((page) => page.slug === slug);

  const findParentChain = (page) => {
    const chain = [];
    let current = page;

    while (current) {
      chain.unshift(current); // Add the current page to the start of the chain
      current = pages.find((p) => p.id === current.parent_id); // Find the parent page
    }

    return chain;
  };

  // Get the full parent chain for the current page
  const parentChain = currentPage ? findParentChain(currentPage) : [];

  // Scroll to the top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the page changes
  }, [slug]);

  useEffect(() => {
    if (slug !== 'contact') {
      // Fetch sections based on the slug only if slug is not 'contact'
      setLoading(true); // Start loading
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
        })
        .finally(() => {
          setLoading(false); // End loading
        });

      // Initialize AOS (Animation On Scroll)
      AOS.init();
    }
  }, [slug]);

  return (
    <div>
      <Header />

      {slug === 'contact' ? (
        // Render the Contact component if the slug is 'contact'
        <Contact />
      ) : loading ? (
        // Show the loader while the API is fetching data
        <Loader />
      ) : (
        // Render sections otherwise
        <>
          {/* Loop through all sections and display them */}
          {
  currentPage ? (
    (() => {
      switch (currentPage.order_number) {
        case 0:
          return sections.map((section, index) => (
            <section key={index} style={{ height: '', backgroundColor: section.bg_color }}>
              <div className="videoBx" style={{ height: '100%' }}>
                <div className="video" style={{ height: '100%' }}>
                  {section.video_link ? (
                    <iframe
                      width="100%"
                      height="700px"
                      src={ `${section.video_link.includes('?') ? section.video_link + '&' : section.video_link + '?'}autoplay=1`}
                      title="Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    section.image && (
                      <img
                        src={section.image}
                        alt="Section Background"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )
                  )}
                </div>
              </div>

              {index === 0 && <Breadcrumbs currentPage={currentPage} />}

              <section className="banner banner-main-product">
                <div className="detail">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(section.title),
                    }}
                  />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(section.description),
                    }}
                  />
                </div>
              </section>
            </section>
          ));
        case 1:
          return sections.map((section, index) => (
            <div key={index}>
              {section.video_link || section.image ? (
                <SectionOne
                  sectionData={section} 
                  currentPage={currentPage} 
                  parentChain={parentChain} 
                />
              ) : (
                <SectionTwo sectionData={section} />
              )}
            </div>
          ));
        case 2:
          return <>
          <section className="title-head">
            {currentPage ? (
              <h1>{currentPage.heading}</h1>
            ) : (
              <h1></h1>
            )}
          </section>

          <div className="product" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <div className="categories">
              <div className="links active">
                <a href="#">Categories &nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i></a>
              </div>

              {parentChain.map((parentPage, index) => (
                <div key={parentPage.id} className={`links ${parentPage.slug === slug ? 'current' : ''}`}>
                  <a href={`/${parentPage.slug}`}>
                    {parentPage.title} &nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
                  </a>
                </div>
              ))}
            </div>

            {sections.map((section, index) => (
              <div key={index}>
                {section.video_link || section.image ? (
                  section.title ? (
                    <SectionSubOne sectionData={section} />
                  ) : (
                    <div>Error: Section data is incomplete.</div>
                  )
                ) : (
                  section.title ? (
                    <SectionSubTwo sectionData={section} />
                  ) : (
                    <div>Error: Section data is incomplete.</div>
                  )
                )}
              </div>
            ))}
          </div>
          <Testimonials/>
          <ClientLogo/>
          </>;
        default:
          return <p>No sections available for this order number.</p>;
      }
    })()
  ) : (
    <p>Loading...</p>
  )
}

          {currentPage && <RelatedProducts parentPageId={currentPage.id} />}
        </>
      )}

      <Footer />
    </div>
  );
};

export default MainProductPage;
