import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchDataAction from '../../../redux/actions/fetchData';
import RoutesList from '.';
import { getDataError, getRoutes, getDataPending } from '../../../redux/reducers/routesAndStops';
import { handleClickByRouteAction } from '../../../redux/actions';
import { checkCondition } from './utils';
import withSmoothScrollbar from './withSmoothScrollBar';

// const RoutesListWithSmoothScrollbar = withSmoothScrollbar(RoutesList);

class RoutesListContainer extends Component {
    
    scrollbar = createRef();

    componentDidMount() { 
        const { fetchData } = this.props;
        fetchData();
    }

    componentDidUpdate() {
        // const { scrollbar } = this.scrollbar.current
        // if (scrollbar) {
        //     console.log(scrollbar.scrollTop = 0)
        // }
    }

    render() {
        const { error, pending, searchQuery, filters, routes, activeRouteId } = this.props;
        let filteredRoutes;
        if (routes && routes.length > 0 && (searchQuery.length > 0 || filters.length > 0)) {
            filteredRoutes = routes.filter(r => checkCondition(r, searchQuery, filters));
        } else if (routes && searchQuery === '' && filters.length === 0) {
            filteredRoutes = routes;
        } else {
            filteredRoutes = []
        }

        return(
            error ? 
                <div>{error}</div> : 
                <RoutesList
                    routes={filteredRoutes} 
                    pending={pending} 
                    handleClickByRoute={this.props.handleClickByRoute} 
                    activeRouteId={activeRouteId} 
                    ref={this.scrollbar}
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
    handleClickByRoute: id => handleClickByRouteAction(id)
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoutesListContainer);
