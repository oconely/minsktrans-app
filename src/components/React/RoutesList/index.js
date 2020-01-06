import React from 'react';
import TransportRoute from '../TransportRoute';

let RoutesList = ({ routes, handleClickByRoute, activeRouteId, pending }) => {

    return(
        !pending ? (
            <div className="RoutesList">
                <ul className="ul-reset RoutesList__inner">
                    {routes && routes.map(r => {
                        return <TransportRoute 
                            key={r.routeid}
                            routeName={r.routename}
                            onClick={handleClickByRoute}
                            routeId={r.routeid}
                            isActive={activeRouteId === r.routeid}
                            routeNumber={r.routenum}
                            weekdays={r.weekdays}
                            dateStart={r.datestart.replace(/<br\s*[\/]?>/gi, "\r")}
                            routeDirection={r.routetype}
                            routeOperator={r.operator}
                            transportType={r.transport}
                        />
                    })}
                </ul>
            </div>
        ) : (
            <div>Загружаем маршруты</div>
        )
    );
}
    
export default RoutesList;