import React, {useState, useEffect} from 'react';
import './CardItem.css';

import { useNavigate } from 'react-router-dom';

export function CardItem({props}) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(props.href);
    }

    return(
        <div class="card_item">
            <p class="card_title">{props.title}</p>
            <button onClick={handleClick} class="card_button">{props.button} </button>
        </div>

    );
}