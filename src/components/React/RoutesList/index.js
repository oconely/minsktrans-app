import React from 'react';
import uuid from 'uuid'
import BusRoute from '../BusRoute';

let RoutesList = ({ busRoutesAndStops, handleClickByRoute, activeRouteId, pending }) => {
    console.log(busRoutesAndStops)
    return(
        !pending ? (
            <div className="RoutesList">
                <ul className="ul-reset RoutesList__inner">
                    {busRoutesAndStops.routes && busRoutesAndStops.routes.data.map(r => 
                        // <BusRoute 
                        //     key={uuid()}
                        //     routeName={r[10]}
                        //     onClick={handleClickByRoute}
                        //     routeId={r[12]}
                        //     isActive={activeRouteId === r[12]}
                        //     busNumber={r[0]}
                        // />
                        <li>Маршрут</li>
                    )}
                </ul>
            </div>
        ) : (
            <div>Загружаем маршруты</div>
        )
    );
}
    
export default RoutesList;