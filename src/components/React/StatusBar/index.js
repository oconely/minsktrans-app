import React from 'react';
import Icon from '../SVGIcon';
import './StatusBar.css';
import { connect } from 'react-redux';

const StatusBar = ({ typeFilters, directionFilter }) => {
    typeFilters = !typeFilters.length ? ['bus', 'tram', 'trol'] : typeFilters
    return (
        <div className="StatusBar">
            <div className="StatusBar__row">
                <h2 className="StatusBar__title">Выбранные маршруты:</h2>
                <ul className="ul-reset StatusBar__list">
                    {typeFilters.map((type, i) => 
                        <li className=" StatusBar__item StatusBar__item_icon" key={i}>
                            <Icon className="StatusBar__icon" name={type} />
                        </li>    
                    )}
                </ul>
            </div>
            <div className="StatusBar__row">
                <h2 className="StatusBar__title">Направления:</h2>
                <ul className="ul-reset StatusBar__list">
                    <li className="StatusBar__direction StatusBar__item" >A>B</li>
                </ul>
            </div>
        </div>
    );
};

const mapStateToStatusBarProps = state => ({
    typeFilters: state.filters
});

export default connect(
    mapStateToStatusBarProps
)(StatusBar);