// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import '../assets/css/sub-product.css'; // Import your styles
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import axios from 'axios';
// import Header from '../Component/Header';
// import Footer from '../Component/Footer';
// import RelatedProducts from '../Component/RelatedProducts';
// import SectionOne from '../Component/SubProductPage/SectionSubOne';
// import SectionTwo from '../Component/SubProductPage/SectionSubTwo';
// import { PagesContext } from './PageContext'; // Ensure PagesContext is defined correctly

// const SubProduct = () => {
//   const { slug } = useParams(); // Get slug from the URL
//   const [sections, setSections] = useState([]); // State to store the fetched sections
//   const [loading, setLoading] = useState(true); // State to handle loading
//   const [error, setError] = useState(null); // State to handle errors

//   const pages = useContext(PagesContext); // Use the pages context

//   // Find the current page based on the slug
//   const currentPage = pages?.length ? pages.find((page) => page.slug === slug) : null;

//   // Function to recursively find the parent chain
//   const findParentChain = (page) => {
//     const chain = [];
//     let current = page;

//     while (current) {
//       chain.unshift(current); // Add the current page to the start of the chain
//       current = pages.find((p) => p.id === current.parent_id); // Find the parent page
//     }

//     return chain;
//   };

//   // Get the full parent chain for the current page
//   const parentChain = currentPage ? findParentChain(currentPage) : [];

//   useEffect(() => {
//     // Fetch sections based on the slug
//     axios
//       .get(`https://theaceworks.com/instruflow/public/api/sections?slug=${slug}`)
//       .then((response) => {
//         if (response.data.sections && response.data.sections.length > 0) {
//           setSections(response.data.sections); // Set the fetched sections data
//         } else {
//           setSections([]); // Handle no sections found
//         }
//       })
//       .catch((error) => {
//         setError('Failed to fetch section data');
//       })
//       .finally(() => {
//         setLoading(false); // Set loading to false once fetching is complete
//       });

//     // Initialize AOS (Animation On Scroll)
//     AOS.init();
//   }, [slug]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <Header />

//       {/* Render the heading only if currentPage exists and has a heading */}
//       <section className="title-head">
//         {currentPage ? (
//           <h1>{currentPage.heading}</h1>
//         ) : (
//           <h1></h1>
//         )}
//       </section>

//       <div className="product" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
//         <div className="">

//           {/* Categories Section */}
//           <div className="categories">
//             <div className="links active">
//               <a href="#">Categories &nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i></a>
//             </div>

//             {/* Display all parents in the chain */}
//             {parentChain.map((parentPage, index) => (
//               <div key={parentPage.id} className={`links ${parentPage.slug === slug ? 'current' : ''}`}>
//                 <a href={`/${parentPage.slug}/subchild`}>
//                   {parentPage.title} &nbsp;&nbsp;<i className="fa-solid fa-angle-right"></i>
//                 </a>
//               </div>
//             ))}
//           </div>

//           {/* Map through sections and render the appropriate component for each */}
//           {sections.map((section, index) => (
//             <div key={index}>
//               {console.log(section)} {/* Log section to debug */}
//               {section.video_link || section.image ? (
//                 section.title ? ( // Check if title exists
//                   <SectionOne sectionData={section} /> // Pass section data to SectionOne
//                 ) : (
//                   <div>Error: Section data is incomplete.</div> // Handle missing data
//                 )
//               ) : (
//                 section.title ? ( // Check if title exists for SectionTwo as well
//                   <SectionTwo sectionData={section} /> // Pass section data to SectionTwo
//                 ) : (
//                   <div>Error: Section data is incomplete.</div> // Handle missing data
//                 )
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       <RelatedProducts parentPageId={currentPage.parent_id} currentPageId={currentPage.id} />
//       <Footer />
//     </div>
//   );
// };

// export default SubProduct;
