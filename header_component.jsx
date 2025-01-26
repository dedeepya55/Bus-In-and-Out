import React, { useState } from "react";
import '../css_files/header.css'; 
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import Logo from '../../assets/project_iship/logo.png';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

function Header({ comp1Ref, comp2Ref, comp3Ref, comp4Ref, comp5Ref, setSearch ,access}) {
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    const scrollToComponent = (ref) => {
        if (ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop,
                behavior: 'smooth',
            });
        }
    };

    const handleSearchClick = () => {
        // Set an initial search term (you can modify this based on your needs)
        const searchTerm = 'your search term'; // Modify this as needed
        setSearch(searchTerm); 
        navigate('/search', { state: { Search: searchTerm } });
    };
    const handleadd = () =>{
        navigate('/add');
    }

    const handleProfile=()=>{
        navigate('/profile');
    }
  
    return (
        <header className="header">
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>
            <nav className={`nav ${isActive ? "active" : ""}`}>
                <ul className="nav-links">
                    <li><a onClick={() => scrollToComponent(comp1Ref)}>Home</a></li>
                    <li><a onClick={() => scrollToComponent(comp2Ref)}>Dashboard</a></li>
                    <li><a onClick={() => scrollToComponent(comp3Ref)}>Location</a></li>
                    <li><a onClick={() => scrollToComponent(comp4Ref)}>About Us</a></li>
                    <li><a onClick={() => scrollToComponent(comp5Ref)}>Help</a></li>
                    {access === 1 && (
                        <li><a onClick={handleadd}>Add</a></li>
                    )}
                    {/* <li><a onClick={handleadd} >Add</a></li> */}
                </ul>
                <div className="search-profile">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="search-input" 
                        onClick={handleSearchClick} // Trigger the search on click
                    />
                    <CgProfile className="profile_icon" onClick={handleProfile} />
                </div>
                <div className="search-icon">
                    <CiSearch className="search-icon1" />
                </div>
                <div className="menu-toggle" onClick={toggleMenu}>
                    <FaBars className="menu-icon" />
                </div>
            </nav>
        </header>
    );
}

export default Header;
