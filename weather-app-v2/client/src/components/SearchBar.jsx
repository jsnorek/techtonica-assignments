import React, { useState } from "react";

function SearchBar({ setLocation }) {
  const [searchInput, setSearchInput] = useState("");

  function handleSearchClick() {
    setLocation(searchInput);
  }

  const handleChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="searchBar" data-testid="search-bar">
      <input
        type="text"
        name="searchInput"
        placeholder="Search"
        required
        value={searchInput}
        onChange={handleChangeSearchInput}
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
}

export default SearchBar;
