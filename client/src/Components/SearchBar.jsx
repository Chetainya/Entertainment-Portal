import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBarSuggestions from './SearchBarSuggestions';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/search?query=${searchQuery}&limit=10` );


      // setSuggestions([
      //   ...videos.map((video) => ({ type: 'video', title: video.title })),
      //   ...users.map((user) => ({ type: 'user', title: user.fullName })),
      //   ...series.map((seriesItem) => ({ type: 'series', title: seriesItem.title })),

      // ].slice(0, 10));
      
      setSuggestions([...response.data.items])// Limit to 10 results
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
    }
  };

  function submitHandeler(e , onSuggestionClickQuery){
    e.preventDefault();
    if(onSuggestionClickQuery){
        setQuery(onSuggestionClickQuery);
    }
    navigate(`/results?searchQuery=${onSuggestionClickQuery || query}`);
    setSuggestions({});
  }

  function resetSuggestions(e){
    e.preventDefault();
    console.log('here')
    setSuggestions([])
  }

  return  (
    <div className="w-full text-black bg-black">
      {/* Search Input */}
      <form onSubmit={submitHandeler}>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        className="border-2 border-black rounded-md p-2 w-96 relative"
        placeholder="Search videos, users, or series..."
        />
        </form>
        

      
      {suggestions.length > 0 && <SearchBarSuggestions onSubmit={submitHandeler} OnClose={resetSuggestions} suggestions={suggestions} />}
    </div> 
  );
};

export default SearchBar;
