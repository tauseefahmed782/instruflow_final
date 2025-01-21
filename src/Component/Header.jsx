import React, { useEffect, useRef, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/navbar.scss';
import logo from '../assets/Logo.svg';
import { PagesContext } from '../pages/PageContext';
import Search from './Search';

const Header = () => {
  const pages = useContext(PagesContext); // Access pages from the context
  const bgRef = useRef(null); // Ref for the background element
  const [activeMenu, setActiveMenu] = useState({ level0: null, level1: null }); // State for active menu items
  const [isMobile, setIsMobile] = useState(false); // State to track if the device is mobile

  useEffect(() => {
    const updateDeviceType = () => {
      setIsMobile(window.innerWidth <= 768); // Consider devices with width <= 768px as mobile
    };

    updateDeviceType(); // Set initial state
    window.addEventListener('resize', updateDeviceType); // Update state on resize

    return () => {
      window.removeEventListener('resize', updateDeviceType);
    };
  }, []);

  useEffect(() => {
    const toggleMenu = () => {
      if (bgRef.current) {
        bgRef.current.classList.toggle('active');
      }
    };

    const barsIcon = document.querySelector('.group .bars');
    if (barsIcon) {
      barsIcon.addEventListener('click', toggleMenu);
    }

    const closeMenu = () => {
      if (bgRef.current) {
        bgRef.current.classList.remove('active');
      }
    };

    const closeIcon = document.querySelector('.close');
    if (closeIcon) {
      closeIcon.addEventListener('click', closeMenu);
    }

    // Close menu when a link is clicked
    const links = document.querySelectorAll('.menu .items a');
    links.forEach((link) =>
      link.addEventListener('click', closeMenu)
    );

    return () => {
      if (barsIcon) {
        barsIcon.removeEventListener('click', toggleMenu);
      }
      if (closeIcon) {
        closeIcon.removeEventListener('click', closeMenu);
      }
      links.forEach((link) =>
        link.removeEventListener('click', closeMenu)
      );
    };
  }, []);

  const handleMenuClick = (id) => {
    if (isMobile) {
      setActiveMenu({ level0: id, level1: null }); // Set active for level 0 and reset level 1
    }
  };

  const handleSubMenuClick = (id, e) => {
    if (isMobile) {
      e.stopPropagation(); // Prevent bubbling to parent items
      setActiveMenu((prev) => ({ ...prev, level1: id })); // Set active for level 1
    }
  };

  const buildMenu = (parentId, level = 0) => {
    return pages
      .filter((page) => page.parent_id === parentId)
      .map((page) => {
        const isActive =
          level === 0
            ? activeMenu.level0 === page.id
            : activeMenu.level1 === page.id;
        const hasSubMenu = pages.some((subPage) => subPage.parent_id === page.id);

        return (
          <div
            className={`items level-${level} ${isActive ? 'active' : ''} ${
              hasSubMenu ? 'has-submenu' : ''
            }`}
            key={page.id}
            onClick={(e) =>
              isMobile
                ? level === 0
                  ? handleMenuClick(page.id)
                  : handleSubMenuClick(page.id, e)
                : null
            }
          >
            <Link to={`/${page.slug}`}>
              {page.title} <i className="fa fa-angle-right"></i>
            </Link>
            {hasSubMenu && (
              <div className="subMenu">{buildMenu(page.id, level + 1)}</div>
            )}
          </div>
        );
      });
  };

  return (
    <div>
      <nav>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="group">
          <div className="bg" ref={bgRef}>
            <div className="menu">
              <div className="close">
                <i className="fa-solid fa-times"></i>
              </div>
              <div className="items">{buildMenu(0)}</div>
            </div>
          </div>
          <Search />
          <div className="bars">
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
