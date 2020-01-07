import React from 'react'
import { Placemark } from 'react-yandex-maps'
import { toGPS } from '../utils'
import iconBus from '../../../images/public/svg/bus.svg';
import iconTram from '../../../images/public/svg/tram.svg';
import iconTrol from '../../../images/public/svg/trolleybus.svg';

const choseIcon = str => {
    switch (str) {
        case "bus":
            return iconBus;
        case "trol":
            return iconTrol;
        default:
            return iconTram;
    }
}

const StopsRoutes = ({stops, activeRouteId, transportType}) => {
    const placemarks = (stops && activeRouteId.length > 0 && stops[`${activeRouteId}`].map(s =>{
        return <Placemark 
            key={s.id}
            geometry={[ toGPS(s.lat), toGPS(s.lng) ]}
            properties={{
                balloonContentHeader: "Остановка",
                balloonContent: `<strong>${s.name}</strong>`
            }}
            options={{
                iconLayout: 'default#image',
                iconImageHref: choseIcon(transportType),
                iconImageSize: [31, 31]
            }}
            modules={["geoObject.addon.balloon"]}
            
        />}
    ))
    return placemarks;
}
export default StopsRoutes;