import React from 'react';
import {faCaretDown, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './searchBar.css';
import {useState} from 'react';
import Select from 'react-select'


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
                       handleCountrySelect, handleDepartmentSelect, handleSearchTypeSelect
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
    const [selectedSearchType, setSelectedSearchType] = useState<string>('NU Course Code')
    const colleges = [  { value: 'CS', label: 'CS' }, { value: 'ARCH', label: 'ARCH' }, { value: 'BIOL', label: 'BIOL' },
                        { value: 'ARTH', label: 'ARTH' }, { value: 'BIOE', label: 'BIOE' }, { value: 'BUSN', label: 'BUSN' },
                        { value: 'CRIM', label: 'CRIM' }, { value: 'BIOL', label: 'BIOL' }, { value: 'ACCT', label: 'ACCT' },
                        { value: 'AFAM', label: 'AFAM' }, { value: 'ANTH', label: 'ANTH' }, { value: 'ARAB', label: 'ARAB' },
                        { value: 'ARTD', label: 'ARTD' }, { value: 'ARTE', label: 'ARTE' }, { value: 'ARTF', label: 'ARTF' },
                        { value: 'ARTG', label: 'ARTG' }, { value: 'ARTS', label: 'ARTS' }, { value: 'ASNS', label: 'ASNS' },
                        { value: 'CHEM', label: 'CHEM' }, { value: 'CHME', label: 'CHME' }, { value: 'CHNS', label: 'CHNS' },
                        { value: 'CINE', label: 'CINE' }, { value: 'CIVE', label: 'CIVE' }, { value: 'CLTR', label: 'CLTR' },
                        { value: 'COMM', label: 'COMM' }, { value: 'CRIM', label: 'CRIM' }, { value: 'CY', label: 'CY' },
                        { value: 'DS', label: 'DS' }, { value: 'ECON', label: 'ECON' }, { value: 'EDUC', label: 'EDUC' },
                        { value: 'EECE', label: 'EECE' }, { value: 'EEMB', label: 'EEMB' }, { value: 'EMGT', label: 'EMGT' },
                        { value: 'ENGL', label: 'ENGL' }, { value: 'ENGW', label: 'ENGW' }, { value: 'ENTR', label: 'ENTR' },
                        { value: 'ENVR', label: 'ENVR' }, { value: 'ENVS', label: 'ENVS' }, { value: 'EXCS', label: 'EXCS' },
                        { value: 'FINA', label: 'FINA' }, { value: 'FLNG', label: 'FLNG' }, { value: 'FRNH', label: 'FRNH' },
                        { value: 'GAME', label: 'GAME' }, { value: 'GE', label: 'GE' }, { value: 'GREK', label: 'GREK' },
                        { value: 'GRMN', label: 'GRMN' }, { value: 'HBRW', label: 'HBRW' }, { value: 'HIST', label: 'HIST' },
                        { value: 'HLTH', label: 'HLTH' }, { value: 'HSCI', label: 'HSCI' }, { value: 'HUSV', label: 'HUSV' },
                        { value: 'IE', label: 'IE' }, { value: 'INAM', label: 'INAM' }, { value: 'INSC', label: 'INSC' },
                        { value: 'INSH', label: 'INSH' }, { value: 'INTB', label: 'INTB' }, { value: 'INTL', label: 'INTL' },
                        { value: 'IS', label: 'IS' }, { value: 'ITLN', label: 'ITLN' }, { value: 'JPNS', label: 'JPNS' },
                        { value: 'JRNL', label: 'JRNL' }, { value: 'JWSS', label: 'JWSS' }, { value: 'LACS', label: 'LACS' },
                        { value: 'LANG', label: 'LANG' }, { value: 'LING', label: 'LING' }, { value: 'LITR', label: 'LITR' },
                        { value: 'LPSC', label: 'LPSC' }, { value: 'MATH', label: 'MATH' }, { value: 'ME', label: 'ME' },
                        { value: 'MGMT', label: 'MGMT' }, { value: 'MGSC', label: 'MGSC' }, { value: 'MISM', label: 'MISM' },
                        { value: 'MKTG', label: 'MKTG' }, { value: 'MSCR', label: 'MSCR' }, { value: 'MUSC', label: 'MUSC' },
                        { value: 'MUSI', label: 'MUSI' }, { value: 'MUST', label: 'MUST' }, { value: 'NETS', label: 'NETS' },
                        { value: 'NRSG', label: 'NRSG' }, { value: 'PHIL', label: 'PHIL' }, { value: 'PHMD', label: 'PHMD' },
                        { value: 'PHSC', label: 'PHSC' }, { value: 'PHTH', label: 'PHTH' }, { value: 'PHYS', label: 'PHYS' },
                        { value: 'PT', label: 'PT' }, { value: 'RELS', label: 'RELS' }, { value: 'SCHM', label: 'SCHM' },
                        { value: 'SOCL', label: 'SOCL' }, { value: 'SPNS', label: 'SPNS' }, { value: 'THTR', label: 'THR' },
                        { value: 'URBS', label: 'URBS' }, { value: 'WMNS', label: 'WMNS' }].sort()

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
        setActiveDropdown(null)
        handleSearchTypeSelect(selected);
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
                            {['NU Course Code', 'University', 'Host Course Name'].map((option, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className={selectedSearchType === option ? 'selected' : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSearchTypeSelected(option);
                                    }}
                                >
                                    {option === 'NU Course Code' ? 'NU Course Name' : option}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <input
                    className="search-container-main"
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