import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ currentPage }) => {
  if (!currentPage) return null;

  return (
    <div className="title-section">
      <div className="detail">
        <div className="sub">
          <hr />
          <span>
            <Link to="/" style={{textDecoration:'none' , color:'#1D2130'}}>
              Home
            </Link>
            <i className="fa-solid fa-angle-right"></i>
            <span style={{ color:'#F05223'}}>{currentPage.title}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
