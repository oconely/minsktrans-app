import React from 'react';
import uuid from 'uuid'
import BusRoute from '../BusRoute';

let RoutesList = ({ routes, handleClickByRoute, activeRouteId, pending }) => {
    console.log(activeRouteId)
    return(
        !pending ? (
            <div className="RoutesList">
                <ul className="ul-reset RoutesList__inner">
                    {routes && routes.map(r => 
                        <BusRoute 
                            key={r.routeid}
                            routeName={r.routename}
                            onClick={handleClickByRoute}
                            routeId={r.routeid}
                            isActive={activeRouteId === r.routeid}
                            busNumber={r.routenum}
                        />
                    )}
                </ul>
            </div>
        ) : (
            <div>Загружаем маршруты</div>
        )
    );
}
    
export default RoutesList;