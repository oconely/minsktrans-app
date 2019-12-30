import React, { Component } from 'react';
import { Map, YMaps } from 'react-yandex-maps';
import Banner from './Banner';
import RoutesList from './RoutesList';



class MinskTransApp extends Component {
    render() {
        return(
            <>
                <YMaps>
                    <Map 
                        state={{center: [53.919749, 27.577372], zoom: 12}} 
                        width="100%" 
                        height="100vh"
                    />
                </YMaps>
                <Banner />
                <RoutesList />
            </>
        )
    }
}

export default MinskTransApp;