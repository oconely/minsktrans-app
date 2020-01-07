import React from 'react';
import TransportRoute from '../TransportRoute';
import {FixedSizeList as List} from 'react-window'
import './RoutesList.css';


let RoutesList = ({ routes, handleClickByRoute, activeRouteId, pending }) => {

    return(
        !pending ? 
            <List
                className="RouteList"
                height={window.innerHeight}
                width={460.8}
                itemSize={155}
                itemCount={routes.length}
            >
                {({index, style}) => (
                    <TransportRoute 
                        routeStyle={style}
                        key={routes[index].routeid}
                        routeName={routes[index].routename}
                        onClick={handleClickByRoute}
                        routeId={routes[index].routeid}
                        isActive={activeRouteId === routes[index].routeid}
                        routeNumber={routes[index].routenum}
                        weekdays={routes[index].weekdays}
                        dateStart={routes[index].datestart.replace(/<br\s*[\/]?>/gi, "\r")}
                        routeDirection={routes[index].routetype}
                        routeOperator={routes[index].operator}
                        transportType={routes[index].transport}
                    />
                )}
            </List> 
            : <div>Загружаем маршруты</div>
    )
}
    
export default RoutesList;