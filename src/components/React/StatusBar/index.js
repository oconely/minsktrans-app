import React from 'react';
import Icon from '../SVGIcon';
import './StatusBar.css';

const StatusBar = ({ typeFilter = ['bus', 'tram', 'trol'], directionFilter }) => (
    <div className="StatusBar">
        <div className="StatusBar__row">
            <h2 className="StatusBar__title">Выбранные маршруты:</h2>
            <ul className="ul-reset StatusBar__list">
                {typeFilter.map((type, i) => 
                    <li className=" StatusBar__item" key={i}>
                        <Icon className="StatusBar__icon" name={type} />
                    </li>    
                )}
            </ul>
        </div>
        <div className="StatusBar__row">
            <h2 className="StatusBar__title">Направления:</h2>
            <ul className="ul-reset StatusBar__list">
                <li className="StatusBar__direction StatusBar__item" >A>B</li>
            </ul>
        </div>
    </div>
);

export default StatusBar;