import React from 'react'
import '../../assets/css/product.scss';
import DOMPurify from 'dompurify';
const SectionTwo =({ sectionData }) => {
  return (
    <div>
         <section className="about">
         <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(sectionData.title),
            }}
          /> {/* Use sectionData for title */}
          <div/>
          <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(sectionData.description),
                }}
              />
          
      
      </section>
    </div>
  )
}

export default SectionTwo