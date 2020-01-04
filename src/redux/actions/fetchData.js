import { fetchDataError, fetchDataPending, fetchDataSuccess } from '.';
import { parse } from 'papaparse';
import axios from 'axios';

const proxy = 'https://gp-js-test.herokuapp.com/proxy';

const fetchData = () => {
    return async dispatch => {
        dispatch(fetchDataPending());
        
        try {
            const data = await Promise.all([
                axios.get(`${proxy}/http://www.minsktrans.by/city/minsk/routes.txt`),
                axios.get(`${proxy}/http://www.minsktrans.by/city/minsk/stops.txt`)
            ]);
            const [ routes, stops ] = data;
            const parsedRoutes = parse(routes.data);
            const parsedStops = parse(stops.data);
            const parsedData = {
                routes: parsedRoutes,
                stops: parsedStops
            }
            dispatch(fetchDataSuccess(parsedData));
            return data;
        } catch (error) {
            dispatch(fetchDataError(error))
        }
    }
}

export default fetchData;