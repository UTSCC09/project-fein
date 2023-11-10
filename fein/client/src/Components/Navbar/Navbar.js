import React, {useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { HomeIcon, MagnifyingGlassIcon, UserIcon, Cog6ToothIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import { BasicMenu } from './BasicMenu';
import SearchBar from '../Common/SearchBar';
import ThemeContext from '../../Context/ThemeContext';

import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';
import { MaterialUISwitch } from './MaterialUISwitch';
const label = { inputProps: { 'aria-label': 'Switch demo' } };



export function Navbar() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    }
    
    const handleTradeClick = () => {
        navigate('/trading');
    }

    const handleProfileClick = () => {
        navigate('/profile');
    }

    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    const [user, setUser] = useState(null);
    const {darkMode, setDarkMode} = useContext(ThemeContext);

    const toggleDarkMode = () => {
      setDarkMode((prevDarkMode) => {
        const newDarkMode = !prevDarkMode;
        localStorage.setItem('darkMode', newDarkMode);
        return newDarkMode;
      });
    }

    useEffect(() => {
      localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    return (
        <nav className="flex bg-navbar sticky top-0 z-50">
            <div onClick={handleLogoClick} class="nav_logo"> FEIN </div>
            <div className="flex px-4 py-2 w-full justify-start text">
                <SearchBar nav={true}/>
            </div>
            { !user ? (
                <div className="flex px-4 py-2 w-full justify-end">
                    <div onClick={handleTradeClick} class="navbar_trading"> Trade </div>
                    <div className="self-center">
                        <FormControlLabel
                            control={<MaterialUISwitch sx={{ m: 1 }} name="darkMode" checked={darkMode} onChange={toggleDarkMode}/>}
                            label=""
                        />
                    </div>
                    <div onClick={handleLogoClick} class="navbar_element">
                        <HomeIcon className="navbar_icon" />
                    </div>
                    <a onClick={handleProfileClick} class="navbar_element"><UserIcon className="navbar_icon"/></a>
                    <div class="navbar_element"><BasicMenu/></div>
                </div>
            ) : (
                <div className="flex px-4 py-2 w-full justify-end">
                    <div className="sign"> Signin </div>
                    <div class="sign"> Signup </div>
                </div>
            )}
        </nav>
    );
}

