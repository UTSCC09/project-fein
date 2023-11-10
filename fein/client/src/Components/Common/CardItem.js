import React, {useState, useEffect} from 'react';
import './CardItem.css';

export function CardItem({props}) {
    return(
        <div class="card_item">
            <p class="card_title">{props.title}</p>
            <a href={props.href} class="card_button">{props.button} </a>
        </div>

    );
}