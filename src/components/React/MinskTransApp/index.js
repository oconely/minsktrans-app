import React from 'react';
import Sidebar from '../Sidebar';
import SearchInput from '../SearchInput';
import RoutesList from '../RoutesList/RouteList';
import Icon from '../SVGIcon';
import Bar from '../Bar/Index';
import FilterButton from '../FilterButton';
import AppMap from '../AppMap';
import StatusBar from '../StatusBar';
import './MinskTransApp.css'


const MinskTransApp = () => (
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
            </Bar>
            <AppMap />
        </div>
    </div>
);

export default MinskTransApp;