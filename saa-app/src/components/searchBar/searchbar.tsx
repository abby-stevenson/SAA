import React from 'react';
import {faCaretDown, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './searchBar.css';
import {useState} from 'react';
import Select from 'react-select'
import UniCardPopup from "../university-card/unicard";

interface SearchBarArgs {
    countries: string[],
    cities: string[]
    query: string;
    handleSearchChange: (query: string) => void;
    handleRegionSelect: (query: string) => void;
    handleCountrySelect: (query: string) => void;
    handleDepartmentSelect: (departments: String[]) => void;
    handleSearchTypeSelect: (searchType: string) => void;

}


function SearchBar({   countries,
                       cities,
                       query,
                       handleSearchChange,
                       handleRegionSelect,
                       handleCountrySelect, handleDepartmentSelect
                   }: SearchBarArgs) {

    interface OptionType {
        value: string;
        label: string;
    }

    const [isVisible, setIsVisible] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<"country" | "city" | "search" | null>(null);
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedDepartments, setSelectedDepartments] = useState<OptionType[]>([]);
    const [selectedSearchType, setSelectedSearchType] = useState<string>('Course Code')
    const colleges = [  { value: 'CS', label: 'CS' },
                        { value: 'ARCH', label: 'ARCH' },
                        { value: 'BIOL', label: 'BIOL' }]

    const queryCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearchChange(e.target.value);
    };

    const selectStyles = {
        menu: (provided: any) => ({
                ...provided,
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: '1px solid #e9ecef',
                zIndex: 9999
        }),
        indicatorSeparator: () => ({
            display: 'none' // Hide the separator line
        }),
        control: (provided: any) => ({
            ...provided,
            backgroundColor: 'white',
            minWidth: '16px',
            borderRadius: '12px',
            height: 'auto',
            borderColor: '#e5e7eb'
        }),
        option: (provided: any, state: { isSelected: any; isFocused: any; }) => ({
            ...provided,
            float: 'none',
            color: 'black',
            padding: '12px 16px',
            textDecoration: 'none',
            display: 'block',
            textAlign: 'left',
            borderRadius: '12px',
            ':hover': {
                backgroundColor: '#ddd',
            }
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: 'black'
        })
    }

    function handleClick() {
        setIsVisible(!isVisible)
    }

    // Updated handlers that update local state AND call parent handlers
    const handleCityClick = (city: string) => {
        setSelectedCity(city);
        setActiveDropdown(null); // Close dropdown after selection
        handleRegionSelect(city);
    };

    const handleCountryClick = (country: string) => {
        setSelectedCountry(country);
        setActiveDropdown(null); // Close dropdown after selection
        handleCountrySelect(country);
    };

    const handleDepartmentSelected = (selected: any) => {
        setSelectedDepartments(selected);
        handleDepartmentSelect(selected ? selected.map((option: { value: any; }) => option.value) : null);
    };


    const handleSearchTypeSelected = (selected: any) => {
        setSelectedSearchType(selected);
        handleSearchTypeSelected(selected);
    };

    return (
        <div>
            <div className="big-container">
                <span className="search-icon">
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </span>
                <div className="search-dropdown">
                    <button
                        className="dropbtn"
                        onClick={() => {
                            const newValue = activeDropdown === 'search' ? null : 'search';
                            setActiveDropdown(newValue);
                        }}>
                        <span>{selectedSearchType}</span>

                        <FontAwesomeIcon icon={faCaretDown} style={{marginLeft: "8px"}}/>
                    </button>
                    <div
                        className={`dropdown-content ${activeDropdown === 'search' ? 'show' : ''}`}>
                        <div>
                            <React.Fragment key={1}>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    handleCountryClick("Course Code");
                                }}>{"Course Code"}</a>
                            </React.Fragment>
                            <React.Fragment key={2}>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    handleCountryClick("University");
                                }}>{"University"}</a>
                            </React.Fragment>
                            <React.Fragment key={3}>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    handleCountryClick("NU Course");
                                }}>{"NU Course Name"}</a>
                            </React.Fragment>
                        </div>
                    </div>
                </div>
                <input
                    className="search-container"
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={queryCallback}
                />
                <button className="advanced-search-button" onClick={handleClick}>Advanced</button>
            </div>
            {isVisible && <div className="advanced-search">

                <div className="filters">

                    <div className="dropdown">
                        <button
                            className="dropbtn"
                            onClick={() => {
                                const newValue = activeDropdown === 'country' ? null : 'country';
                                setActiveDropdown(newValue);
                            }}>
                            <span>{selectedCountry || "Country"}</span>

                            <FontAwesomeIcon icon={faCaretDown} style={{marginLeft: "8px"}}/>
                        </button>
                        <div
                            className={`dropdown-content ${activeDropdown === 'country' ? 'show' : ''}`}>
                            {countries.map((c, index) => (
                                <React.Fragment key={index}>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        handleCountryClick(c);
                                    }}>{c}</a>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="dropdown">
                        <button className="dropbtn"
                                onClick={() => {
                                    const newValue = activeDropdown === 'city' ? null : 'city';
                                    setActiveDropdown(newValue);}}>
                    <span>
                    {selectedCity ? selectedCity : "City"}
                    </span>
                            <FontAwesomeIcon icon={faCaretDown} style={{marginLeft: "8px"}}/>
                        </button>

                        <div
                            className={`dropdown-content ${activeDropdown === 'city' ? 'show' : ''}`}>
                            {cities.map((c, index) => (
                                <React.Fragment key={index}>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        handleCityClick(c);
                                    }}>{c}</a>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="dropdown">
                        <Select options={colleges}
                                styles={selectStyles}
                                menuPortalTarget={document.body}
                                onChange={handleDepartmentSelected}
                                value={selectedDepartments}
                                isMulti
                                placeholder="Department"
                                components={{ DropdownIndicator: (props: any) => (
                                        <div {...props.innerProps}>
                                            <FontAwesomeIcon icon={faCaretDown} style={{marginLeft: "8px",
                                            marginRight: "8px", padding: "14px 16px"}}/>
                                        </div>
                                    )
                                }}
                        />
                    </div>

                    {(selectedCity || selectedCountry || selectedDepartments.length > 0) && (
                        <div className="dropdown">
                            <button
                                className="clear-filters"
                                onClick={() => {
                                    handleCityClick('');
                                    handleCountryClick('');
                                    handleDepartmentSelected([]);
                                }}>
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

            </div>}
        </div>
    );


}

export default SearchBar;