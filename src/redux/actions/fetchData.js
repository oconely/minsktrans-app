import { fetchDataError, fetchDataPending, fetchDataSuccess } from '.';
import { parse } from 'papaparse';
import axios from 'axios';
import { convertCSVtoObjectsArray, mapRouteIdToStops } from '../../components/React/utils';

const proxy = 'https://gp-js-test.herokuapp.com/proxy';

const setTransportType = (operator) => {
        if (operator.includes('АП') || operator === '' || operator === 'bus') {
            return 'bus';
        } else if (operator.includes('ТП')) {
            return 'trol';
        } else if (operator.includes('ТР')) {
            return 'tram';
        }
    }

const fetchData = () => {
    return async dispatch => {
        dispatch(fetchDataPending());
        
        try {
            const data = await Promise.all([
                axios.get(`${proxy}/http://www.minsktrans.by/city/minsk/routes.txt`),
                axios.get(`${proxy}/http://www.minsktrans.by/city/minsk/stops.txt`)
            ]);
            const [ routes, stops ] = data;
            const routesArray = convertCSVtoObjectsArray(routes.data, arr => arr.filter(r => r.routenum.length && (r.operator.includes('ТП') || r.operator.includes('АП') || r.operator.includes('ТР') || r.operator === '' ))
                                .map(r => ({...r, routestops: r.routestops.split(','), transport: setTransportType(r.operator)})));
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