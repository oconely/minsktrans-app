import React from 'react';
import './RoutesList.css';
import uuid from 'uuid'
import BusRoute from '../BusRoute';

const RoutesList = ({ routes, handleClickByRoute, activeRouteId }) => 
    <div className="RoutesList">
        <ul className="ul-reset RoutesList__inner">
            {routes.map(r => 
                <BusRoute 
                    key={uuid()}
                    routeName={r[10]}
                    onClick={handleClickByRoute}
                    routeId={r[12]}
                    isActive={activeRouteId === r[12]}
                    busNumber={r[0]}
                />
            )}
        </ul>
    </div>

export default RoutesList;