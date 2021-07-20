import React, { useState } from "react";
import './Card.css';

export default function Card(props) {

    return (
        <div
            className="card"
            style={{ backgroundImage: `url(${props.elem.image_url})` }}>
            <span className="rating">{props.elem.score}</span>
            <span className="title">{props.elem.title}</span>
            <a
                href="#"
                onClick={() => props.onOpenStats(props.elem.mal_id)}>more</a>
        </div>
    );
}
