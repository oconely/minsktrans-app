import { connect } from 'react-redux'
import Button from '../Button'
import { changeFilters } from '../../../redux/actions';

const mapStateToButtonProps = (state, ownProps) => ({
    active: state.filters.includes(ownProps.filter.toLowerCase())
});

const mapDispatchToButtonProps = (dispatch, ownProps) => ({
    handleClick: () => dispatch(changeFilters(ownProps.filter))
});

const FilterButton = connect(
    mapStateToButtonProps,
    mapDispatchToButtonProps
)(Button);

export default FilterButton;