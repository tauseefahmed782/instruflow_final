import React from 'react';
import DOMPurify from 'dompurify';

const SectionOne = ({ sectionData, parentChain }) => {
  // Determine if padding should be added based on video presence
  const shouldAddPadding = !!sectionData.video_link; // Only add padding if a video is present

  return (
    <section
      className={`banner productPage`}
      style={shouldAddPadding ? { paddingTop: '100px' } : {}}
    >
      <div className="detail">
        <div className="sub">
          <hr />
          <span>
            <a href="/">Home</a>
            <i className="fa-solid fa-angle-right"></i>
            {parentChain.map((parent, index) => (
              <span key={parent.id}>
                <a href={`/${parent.slug}`}>{parent.title}</a>
                {index < parentChain.length - 1 && (
                  <i className="fa-solid fa-angle-right"></i>
                )}
              </span>
            ))}
          </span>
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(sectionData.title),
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(sectionData.description),
            }}
          />
        </div>
      </div>

      <div className="videoBx">
        {sectionData.video_link ? (
          <div className="video">
            <iframe
              width="560"
              height="315"
              src={`${
                sectionData.video_link.includes('?')
                  ? sectionData.video_link + '&'
                  : sectionData.video_link + '?'
              }autoplay=1&mute=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        ) : sectionData.image ? (
          <img
            style={{ margin: '50px 0px' }}
            src={sectionData.image}
            width="560"
            height="315"
            alt={sectionData.title || 'Product Image'}
          />
        ) : null}
      </div>
    </section>
  );
};

export default SectionOne;
