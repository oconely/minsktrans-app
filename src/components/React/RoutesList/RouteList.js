import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchDataAction from '../../../redux/actions/fetchData';
import RoutesList from '.';
import { getDataError, getRoutes, getDataPending } from '../../../redux/reducers/routesAndStops';
import { handleClickByRouteAction } from '../../../redux/actions';
import { checkCondition, getCondition } from './utils';



class RoutesListContainer extends Component {
    
    constructor(props) {
        super(props);
        this.computeFilteredRoutes = this.computeFilteredRoutes.bind(this);
    }

    componentDidMount() { 
        const { fetchData } = this.props;
        fetchData();
        this.listHeight = window.innerHeight;
    }

    computeFilteredRoutes() {
        const { searchQuery, filters, routes } = this.props;
        
        if (filters.length && !searchQuery.trim().length && routes) {
            return routes.filter(r => filters.some(f => r.transport.includes(f)));
        } else if (!filters.length && searchQuery.length && routes) {
            const field = getCondition(searchQuery);
            return routes.filter(r => r[field].toLowerCase().includes(searchQuery.trim().toLowerCase()));
        } else if (!searchQuery.length && !filters.length && routes) {
            return routes
        } else if (searchQuery.length && filters.length && routes) {
            return routes.filter(r => checkCondition(r, searchQuery, filters));
        } 
        else {
            return [];
        }
    }

    render() {
        const { computeFilteredRoutes } = this;
        const { error, pending, activeRouteId } = this.props;
        const filteredRoutes = computeFilteredRoutes();
        
        return(
            error ? 
                <div>{error}</div> : 
                <RoutesList
                    routes={filteredRoutes} 
                    pending={pending} 
                    handleClickByRoute={this.props.handleClickByRoute} 
                    activeRouteId={activeRouteId}
                    listHeight={this.listHeight}
                />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: getDataError(state.routesAndStops),
        routes: getRoutes(state.routesAndStops),
        pending: getDataPending(state.routesAndStops),
        filters: state.filters,
        searchQuery: state.searchQuery,
        activeRouteId: state.activeRouteId
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchData: fetchDataAction,
    handleClickByRoute: (id, transportType) => handleClickByRouteAction(id, transportType)
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoutesListContainer);
