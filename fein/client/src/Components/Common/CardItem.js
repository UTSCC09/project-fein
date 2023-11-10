import React, {useState, useEffect, useContext} from 'react';
import './CardItem.css';
import ThemeContext from '../../Context/ThemeContext';
import { useNavigate, useParams } from 'react-router-dom';

export function CardItem({props}) {
    const { darkMode } = useContext(ThemeContext);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(props.href);
    }

    return(
        <div class={`${darkMode ? "card_item_dark" : "card_item"}` }>
            <p class="card_title">{props.title}</p>
            <button onClick={handleClick} class="card_button">{props.button} </button>
        </div>

    );
}