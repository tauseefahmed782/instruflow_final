import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import DOMPurify from 'dompurify';

const SearchResults = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Get 'title' from the query parameters
  const getQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('title') || ''; // Use 'title' instead of 'query'
  };

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const title = getQuery(); // Get the 'title' from query
        const response = await axios.get(
          `https://theaceworks.com/instruflow/public/api/pages/search?title=${encodeURIComponent(title)}`
        );

        // Update state with API response
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
      setLoading(false);
    };

    fetchResults();
  }, [location.search]);

  const generateLink = (child) => {
    // Determine the link based on parent_id
    if (child.parent_id === 0) {
      return `/${child.slug}/main`; // Parent id 0
    } else if (child.parent_id === 1) {
      return `/${child.slug}/child`; // Parent id 1
    } else {
      return `/${child.slug}/subchild`; // Default case for other parent_id values
    }
  };

  // Generate link for the parent page considering its parent
  const generateParentLink = (parentPage) => {
    // Check if the parent page is a child of another page
    if (parentPage.parent_id === 0) {
      return `/${parentPage.slug}/main`; // Direct link for parent id 0
    } else {
      // Here you can check for different parent_ids as necessary
      return `/${parentPage.slug}/child`; // Default to child link for other cases
    }
  };

  return (
    <div>
      <Header />

      <div className='search_result'>
      <h1>Search Results</h1>
        {loading ? (
          <p>Loading...</p>
        ) : results ? (
          <div>
            {/* Display parent page */}
            <h2>{results.parent_page?.title}</h2>
            <p>{results.parent_page?.description}</p>
            {/* Link to the parent page */}
            <Link to={generateParentLink(results.parent_page)} className='parent_link'>
             Read More
            </Link>

            {/* Display child pages */}
            {results.child_pages && results.child_pages.length > 0 ? (
              <ul>
                {results.child_pages.map((child) => (
                  <li key={child.slug}>
                    <h3>{child.title}</h3>
                    <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(child.description),
                }}
              />
                    <Link to={generateLink(child)}>
                      Read More
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No child pages found.</p>
            )}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
