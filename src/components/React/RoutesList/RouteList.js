import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchDataAction from '../../../redux/actions/fetchData';
import RoutesList from '.';
import { getDataError, getRoutes, getDataPending } from '../../../redux/reducers/routesAndStops';

class RoutesListContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() { 
        const { fetchData } = this.props;
        fetchData();
    }

    render() {

        const { error } = this.props;
        return(
            error ? (
                <div>{error}</div>
            ) : (
                <RoutesList 
                    { ...this.props }
                />
            )
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: getDataError(state.routesAndStops),
        routes: getRoutes(state.routesAndStops, state.searchQuery, state.filters),
        pending: getDataPending(state.routesAndStops)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchData: fetchDataAction
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoutesListContainer);
