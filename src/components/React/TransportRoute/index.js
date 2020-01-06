import React from 'react';

const TransportRoute = ({ 
    routeName, 
    onClick, 
    routeId, 
    isActive, 
    routeNumber, 
    dateStart, 
    weekdays,
    routeType,
    transportType,
    routeOperator 
}) => (
    <li 
        className={`TransportRoute ${isActive ? 'TransportRoute_active' : ''}`}
        onClick={() => onClick(routeId)}
    >
        <div className="TransportRoute__weekdays">

        </div>
        <div className="TransportRoute__number">
            {routeNumber}
        </div>
        <div className="BusRoute__name">
            {routeName}
        </div>
        <div className="BusRoute__name">
            {dateStart}
        </div>
    </li>
);
    
export default TransportRoute;