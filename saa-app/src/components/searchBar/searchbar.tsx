import React from 'react';
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './searchBar.css';
import { useState } from 'react';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="big-container">
            <span className="search-icon">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <input
                className="search-container"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
            />
        </div>
    );
}
export default SearchBar;