import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Use Navigate for redirects
import HomePage from './pages/HomePage'; // Import your pages
import About from './pages/About';
import ProductPage from './pages/ProductPage';
import SubProduct from './pages/SubProduct';
import MainProductPage from './pages/MainProductPage';
import Contact from './pages/Contact';
import { PagesProvider } from './pages/PageContext';
import Search from './Component/Search';
import SearchResults from './Component/SearchResult';
import CommonPage from './pages/CommonPage';

const App = () => {
  return (
    <PagesProvider>
      <Router>
        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<HomePage />} /> {/* Set the route for HomePage */}
          <Route path="about" element={<About />} /> {/* Set the route for About page */}
          
          {/* Product Pages */}
          
          {/* <Route path=":slug/main" element={<MainProductPage />} /> */}
          <Route path=":slug" element={<MainProductPage />} />
          {/* <Route path=":slug/child" element={<ProductPage />} />
          <Route path=":slug/subchild" element={<SubProduct />} /> */}

          {/* Search-related pages */}
          <Route path="/search" element={<SearchResults />} />
          
          {/* Contact Page */}
          <Route path="/contact-us" element={<Contact />} />
          
          {/* Redirect invalid paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </PagesProvider>
  );
};

// Use createRoot to render the app in React 18
const root = createRoot(document.getElementById('root'));
root.render(<App />);
