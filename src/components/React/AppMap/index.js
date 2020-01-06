import React, { useEffect, useRef } from 'react';
import { Map, YMaps, Placemark, } from 'react-yandex-maps';
import { toGPS } from '../utils';
import { connect } from 'react-redux';
import StopsRoutes from '../StopsRoutes';

let ymap;

const getActiveRouteStoopsCoords = (stops, activeRouteId) => {
    return stops[`${activeRouteId}`].map(s =>{
        return [ toGPS(s.lat), toGPS(s.lng) ]
    })
}

const setCenter = (stops, activeRouteId, ymap) => {
    if (!stops || !ymap || activeRouteId.length === 0) {
        return [53.919749, 27.577372]
    } else {
        const coords = getActiveRouteStoopsCoords(stops, activeRouteId)
        return coords[Math.floor(coords.length / 2)];
    }
}

const AppMap = ({ stops, activeRouteId }) => {

    const didMountRef = useRef(false)
    useEffect(() => {
        if (didMountRef.current) {
            if (!stops || !ymap || activeRouteId.length === 0 ) return
            const coords = getActiveRouteStoopsCoords(stops, activeRouteId)

            ymap.setCenter(coords[Math.floor((coords.length / 2))], 12, {
                duration: 1000
            })
            
        } else didMountRef.current = true
    })

    return(
        <YMaps>
            <Map instanceRef={el => ymap = el}
                state={{center: [53.919749, 27.577372], zoom: 12}} 
                width="100%" 
                height="100vh"
            >
                {stops && <StopsRoutes stops={stops} activeRouteId={activeRouteId} />}
            </Map>
        </YMaps>
)};

const mapStateToAppMapProps = (state) => ({
    stops: state.routesAndStops.data?.stops,
    activeRouteId: state.activeRouteId
})

export default connect(
    mapStateToAppMapProps
)(AppMap);
