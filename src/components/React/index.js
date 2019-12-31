import React, { Component } from 'react';
import { Map, YMaps, Placemark, } from 'react-yandex-maps';
import RoutesList from './RoutesList';
import axios from 'axios';
import { parse } from 'papaparse'
import { checkRoutesCondition, toGPS } from './utils';
import uuid from 'uuid';
import Sidebar from './Sidebar';

import './index.css';

const proxy = 'https://gp-js-test.herokuapp.com/proxy';

class MinskTransApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            busRoutes: null,
            busStops: null,
            activeRouteId: null
        }
        this.handleClickByRoute = this.handleClickByRoute.bind(this);
    }

    async componentDidMount() {
            const data = await Promise.all([
                axios.get(`${proxy}/http://www.minsktrans.by/city/minsk/routes.txt`),
                axios.get(`${proxy}/http://www.minsktrans.by/city/minsk/stops.txt`)
            ])
            const [routes, stops] = data;
            const parsedRoutes = parse(routes.data);
            const parsedStops = parse(stops.data);
            const filteredRoutes = parsedRoutes.data.filter(r => checkRoutesCondition(r));
            this.setState({
                busRoutes: filteredRoutes,
                busStops: parsedStops.data
            });
    }

    handleClickByRoute(id) {
        this.setState({
            activeRouteId: id
        })
    }

    render() {
        const { busRoutes, busStops, activeRouteId } = this.state;
        let activeRoute;
        let stopsIds;
        let filteredStops;
        if (busRoutes) {
            activeRoute = busRoutes.filter(bs => bs[12] === activeRouteId);
            if (activeRoute.length) {
                stopsIds = activeRoute[0][14].split(',');
                filteredStops = busStops.filter(s => stopsIds.includes(s[0]));
            }
        }
        return(
            <div className="App">
                    <Sidebar>
                        { busRoutes && 
                            <RoutesList 
                                routes={busRoutes}
                                handleClickByRoute={this.handleClickByRoute}
                                activeRouteId={activeRouteId}
                            />
                        }
                    </Sidebar>
                <div className="RoutesMap">
                    <YMaps>
                        <Map 
                            state={{center: [53.919749, 27.577372], zoom: 12}} 
                            width="100%" 
                            height="100vh"
                        >
                            {filteredStops && filteredStops.map(s =>
                                <Placemark 
                                    key={uuid()}
                                    geometry={[ toGPS(s[7]), toGPS(s[6]) ]}
                                    properties={{
                                        balloonContentHeader: "Остановка",
                                        balloonContent: `<strong>${s[4]}</strong>`
                                    }}
                                    modules={["geoObject.addon.balloon"]}
                                />
                            )}
                        </Map>
                    </YMaps>
                </div>
            </div>
        )
    }
}

export default MinskTransApp;