import Input from '../Input';
import { connect } from 'react-redux';
import { setSearchQuery } from '../../../redux/actions';
import { throttle, debounce } from 'lodash-es'

const mapStateToInputProps = state => ({
    isDataLoaded: state.isDataLoaded
});

const mapDispatchToInputProps = dispatch => ({
    handleChange: debounce(query => dispatch(setSearchQuery(query)), 180)
});

const SearchInput = connect(
    mapStateToInputProps,
    mapDispatchToInputProps
)(Input);

export default SearchInput;