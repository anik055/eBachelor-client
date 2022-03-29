import React, { useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import './Header.css';


const Header = () => {
    // console.log(useContext(UserContext));
    return (
        <div className="header-container">
            <Navbar></Navbar>

        </div>
    );
};

export default Header;