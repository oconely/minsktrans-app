import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchDataAction from '../../../redux/actions/fetchData';
import RoutesList from '.';
import { getDataError, getRoutes, getDataPending } from '../../../redux/reducers/busRoutesAndStops';

class RoutesListContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() { 
        const { fetchData } = this.props;
        fetchData();
    }

    render() {
        console.log(this.props)
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


const mapStateToProps = (state) => ({
    error: getDataError(state.busRoutesAndStops),
    busRoutesAndStops: getRoutes(state.busRoutesAndStops),
    pending: getDataPending(state.busRoutesAndStops)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchData: fetchDataAction
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoutesListContainer);
