import React from 'react'
import s from './card.module.css';

export default function Card({ card }) {
    return (
        <div className={s.card}>
            {card.suite} {card.number}
        </div>
    )
}
