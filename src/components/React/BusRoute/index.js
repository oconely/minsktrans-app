import React from 'react';
import './BusRoute.css';


const BusRoute = ({ routeName, onClick, routeId, isActive, busNumber }) => 
    <li 
        className={`BusRoute ${isActive ? 'BusRoute_active' : ''}`}
        onClick={() => onClick(routeId)}
    >
        <span className="BusRoute__number">
            {busNumber}
        </span>
        <span className="BusRoute__name">
            {routeName}
        </span>
    </li>;

export default BusRoute;