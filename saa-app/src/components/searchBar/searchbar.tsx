import React from 'react';
import {faCaretDown, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './searchBar.css';
import { useState } from 'react';

interface SearchBarArgs {
    query: string;
    handleSearchChange: (query: string) => void;
}

function SearchBar({query, handleSearchChange}: SearchBarArgs) {
    const [isVisible, setIsVisible] = useState(false)
    //const [activeDropdown, setActiveDropdown] = useState<"region" | "country" | null>(null);
    //const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    //const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    const queryCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearchChange(e.target.value);
    };

    /*
    function handleClick() {
        setIsVisible(!isVisible)
    }
     */


    return (
        <div>
            <div className="big-container">
                <span className="search-icon">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <input
                    className="search-container"
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={queryCallback}
                />
            </div>
        </div>
    );


}
export default SearchBar;
