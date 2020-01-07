import Input from '../Input';
import { connect } from 'react-redux';
import { setSearchQuery } from '../../../redux/actions';
import { throttle } from 'lodash-es'

const mapStateToInputProps = state => ({
    isDataLoaded: state.isDataLoaded
});

const mapDispatchToInputProps = dispatch => ({
    handleChange: throttle(query => dispatch(setSearchQuery(query)), 300)
});

const SearchInput = connect(
    mapStateToInputProps,
    mapDispatchToInputProps
)(Input);

export default SearchInput;