import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import SearchInput from '../SearchInput';
import RoutesList from '../RoutesList/RouteList';
import Icon from '../SVGIcon';
import Bar from '../Bar/Index';
import FilterButton from '../FilterButton';
import TestRenderButton from '../TestRenderButton';
import AppMap from '../AppMap';
import './MinskTransApp.css'
import StatusBar from '../StatusBar';


class MinskTransApp extends Component {
    render() {
        return(
            <div className="App">
                <Sidebar>
                    <StatusBar />
                    <RoutesList />
                </Sidebar>
                <div className="RoutesMap">
                    <Bar className="Bar_main">
                        <SearchInput 
                            className="input SearchInput_main"
                            placeholderText="Введите номер или часть названия маршрута" 
                        />
                        <FilterButton filter="bus">
                            <Icon name="bus" className="Button__icon" />
                        </FilterButton>
                        <FilterButton filter="tram">
                            <Icon name="tram" className="Button__icon" />
                        </FilterButton>
                        <FilterButton filter="trol">
                            <Icon name="trol" className="Button__icon" />
                        </FilterButton>
                        {/* <FilterButton filter="a>b">
                            A>B
                        </FilterButton>
                        <FilterButton filter="b>a">
                            B>A
                        </FilterButton>
                        <TestRenderButton>
                            Test Render
                        </TestRenderButton> */}
                    </Bar>
                    <AppMap />
                </div>
            </div>
        );
    }
}

export default MinskTransApp;