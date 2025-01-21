import React from 'react';
import '../../assets/css/product.scss'; // Import your styles
import DOMPurify from 'dompurify';

const SectionSubTwo = ({ sectionData }) => {
  if (!sectionData) {
    return <div>Error: Section data is missing.</div>; // Handle missing section data
  }

  return (
    <div>
      <section className="about">
        {/* Sanitize and render the title */}
        <h2
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(sectionData.title),
          }}
        />
        <div /> {/* This empty div can be styled if needed */}
        {/* Sanitize and render the description */}
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(sectionData.description),
          }}
        />
      </section>
    </div>
  );
};

export default SectionSubTwo;
