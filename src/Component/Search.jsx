import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [title, setTitle] = useState(''); // Change the query state to title
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (title.trim()) {
      // Navigate with 'title' as the query parameter
      navigate(`/search?title=${encodeURIComponent(title)}`);
    }
  };

  return (
    <div>
      <div className="search">
        <form onSubmit={handleSearch} className='form'>
          <input
            type="search"
            placeholder="Search"
            value={title} // Bind input to title
            name="title" // Use title as the name
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" className="icon">
          <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
