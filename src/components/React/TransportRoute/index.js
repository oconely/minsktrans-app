import React from 'react';
import Icon from '../SVGIcon';
import './TransportRoute.css';
import Shield from '../Shield/inde';
import WeekDaysList from '../WeekdaysList';

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
        { weekdays && <WeekDaysList weekdays={weekdays} Day={Shield} /> }
        <div className="TransportRoute__options">
            <div className="TransportRoute__direction">
                {routeDirection}
            </div>
            <div className="TransportRoute__info-button">
                <Icon name="info" className="TransportRoute__icon TransportRoute__icon_info" />
            </div>
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