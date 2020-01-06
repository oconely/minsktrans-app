import { fetchDataError, fetchDataPending, fetchDataSuccess } from '.';
import axios from 'axios';
import { convertCSVtoObjectsArray, mapRouteIdToStops } from '../../components/React/utils';
import { proxy, optimizeRoutesData } from './utils';


const fetchData = () => {
    return async dispatch => {
        dispatch(fetchDataPending());
        
        try {
            const data = await Promise.all([
                axios.get(`${proxy}/http://www.minsktrans.by/city/minsk/routes.txt`),
                axios.get(`${proxy}/http://www.minsktrans.by/city/minsk/stops.txt`)
            ]);
            const [ routes, stops ] = data;
            const routesArray = convertCSVtoObjectsArray(routes.data, optimizeRoutesData);
            const stopsArray = convertCSVtoObjectsArray(stops.data);
            const routesStops = mapRouteIdToStops(routesArray, stopsArray);

            const parsedData = {
                routes: routesArray,
                stops: routesStops,
            }
            dispatch(fetchDataSuccess(parsedData));
            return data;
        } catch (error) {
            dispatch(fetchDataError(error))
        }
    }
}

export default fetchData;