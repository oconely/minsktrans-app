import React from 'react';
import './BusRoute.css';


const BusRoute = ({ routeName, onClick, routeId, isActive }) => 
    <li 
        className={`BusRoute ${isActive ? 'BusRoute_active' : ''}`}
        onClick={() => onClick(routeId)}
    >
        {routeName}
    </li>;

export default BusRoute;