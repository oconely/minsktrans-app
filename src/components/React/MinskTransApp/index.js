import React, { Component } from 'react';
import { Map, YMaps, Placemark, } from 'react-yandex-maps';
import axios from 'axios';
import { parse } from 'papaparse'
import { checkRoutesCondition, toGPS } from '../utils';
import uuid from 'uuid';
import Sidebar from '../Sidebar';
import SearchInput from '../SearchInput';
import { store } from '../../../js/app';
import { setDataLoaded } from '../../../redux/actions';

import './MinskTransApp.css'
import RoutesList from '../RoutesList/RouteList';
import Icon from '../SVGIcon';
import Bar from '../Bar/Index';
import Button from '../Button';
import FilterButton from '../FilterButton';

const proxy = 'https://gp-js-test.herokuapp.com/proxy';

class MinskTransApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            busRoutes: null,
            busStops: null,
            activeRouteId: null
        }
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
                    <RoutesList />
                </Sidebar>
                <div className="RoutesMap">
                    <Bar>
                        <SearchInput 
                            placeholderText="Введите номер или часть названия маршрута" 
                        />
                        <FilterButton filter="bus">
                            <Icon name="bus" />
                        </FilterButton>
                        <FilterButton filter="tram">
                            <Icon name="tram" />
                        </FilterButton>
                        <FilterButton filter="trol">
                            <Icon name="trol" />
                        </FilterButton>
                        <FilterButton filter="a>b">
                            A>B
                        </FilterButton>
                        <FilterButton filter="b>a">
                            B>A
                        </FilterButton>
                    </Bar>
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
        );
    }
}

export default MinskTransApp;