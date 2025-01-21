import React from 'react';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';

const SectionSubOne = ({ sectionData }) => {
  if (!sectionData) {
    return <div>Error: Section data is missing.</div>; // Handle missing section data
  }

  const { title, description, image , video_link } = sectionData; // Destructure properties

  return (
    <div>
      <div className="product-preview">
        <div className="details">
          {/* Sanitize and render the title and description */}
          <h2
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(title),
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />
          <div className="button-box">
            <Link to="/quote"> {/* Use 'to' instead of 'href' for React Router */}
              Get Quote
            </Link>
          </div>
        </div>
        <div className="image">
          <img src={image} alt="Sub Product" />
        </div>
      </div>
      <div>
      <div className="video-wrapper" style={{marginBottom:'50px'}}>
      <ReactPlayer
    url={video_link}
    controls
    playing={true} // Autoplay enabled // Starts muted
    width="100%"
    height="850px"
  />
    </div>
      </div>
    </div>
  );
};

export default SectionSubOne;
