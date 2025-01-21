import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const PagesContext = createContext();

// Create a provider component
export const PagesProvider = ({ children }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch('https://theaceworks.com/instruflow/public/api/pages');
        const data = await response.json();
        if (data.pages) {
          setPages(data.pages);
        }
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };

    fetchPages();
  }, []);

  return (
    <PagesContext.Provider value={pages}>
      {children}
    </PagesContext.Provider>
  );
};
