import React from 'react';
import Icon from '../SVGIcon';
import './TransportRoute.css';
import Shield from '../Shield/inde';

const TransportRoute = ({ 
    routeName, 
    onClick, 
    routeId, 
    isActive, 
    routeNumber, 
    dateStart, 
    weekdays,
    routeDirection,
    transportType,
    routeOperator 
}) => (
    <li 
        className={`TransportRoute ${isActive ? 'TransportRoute_active' : ''}`}
        onClick={() => onClick(routeId)}
    >
        {weekdays && 
            <ul className="ul-reset TransportRoute__weekdays">
                {weekdays.map((d, i) => 
                    <Shield key={i}>{d}</Shield>
                )}
            </ul>
        }
        <div className="TransportRoute__direction">
            {routeDirection}
        </div>
        <div className="TransportRoute__info-button">
            <Icon name="info" className="TransportRoute__icon TransportRoute__icon_info" />
        </div>
        <div className="TransportRoute__number">
            {routeNumber}
            <Icon name={transportType} className="TransportRoute__icon TransportRoute__icon_transport" />
        </div>
        <div className="TransportRoute__name">
            {routeName}
        </div>
    </li>
);
    
export default TransportRoute;