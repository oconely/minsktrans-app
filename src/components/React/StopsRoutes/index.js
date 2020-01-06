import React from 'react'
import { Placemark } from 'react-yandex-maps'
import { toGPS } from '../utils'


const StopsRoutes = ({stops, activeRouteId}) =>{
    console.log(activeRouteId)
    console.log(stops && activeRouteId.length > 0)
    const placemarks = (stops && activeRouteId.length > 0 && stops[`${activeRouteId}`].map(s =>{
        return <Placemark 
            key={s.id}
            geometry={[ toGPS(s.lat), toGPS(s.lng) ]}
            properties={{
                balloonContentHeader: "Остановка",
                balloonContent: `<strong>${s.name}</strong>`
            }}
            modules={["geoObject.addon.balloon"]}
        />}
    ))
    console.log(placemarks)
    return placemarks;
    

}
export default StopsRoutes;