import React, {useState, useEffect, useContext} from 'react';
import './CardItem.css';
import { useThemeContext } from '../../Context/ThemeContext';
import Link from 'next/link';

export function CardItem({props}) {
    const { darkMode, setDarkMode } = useThemeContext();

    return(
        <div className={`${darkMode ? "card_item_dark" : "card_item"}` }>
            <p className="card_title">{props.title}</p>
            <Link href={props.href} className="card_button">{props.button} </Link>
        </div>

    );
}