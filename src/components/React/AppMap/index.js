import React from 'react';
import { Map, YMaps, Placemark, } from 'react-yandex-maps';
import { toGPS } from '../utils';
import { connect } from 'react-redux';


const AppMap = ({ stops, activeRouteId }) => {
    console.log(stops && stops.activeRouteId)
    return (
    <YMaps>
        <Map 
            state={{center: [53.919749, 27.577372], zoom: 12}} 
            width="100%" 
            height="100vh"
        >
            {stops && activeRouteId.length > 0 && stops[`${activeRouteId}`].map(s =>{
                return <Placemark 
                    key={s.id}
                    geometry={[ toGPS(s.lat), toGPS(s.lng) ]}
                    properties={{
                        balloonContentHeader: "Остановка",
                        balloonContent: `<strong>${s.name}</strong>`
                    }}
                    modules={["geoObject.addon.balloon"]}
                />}
            )}
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
