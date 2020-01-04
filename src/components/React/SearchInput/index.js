import Input from '../Input';
import { connect } from 'react-redux';
import { setSearchQuery } from '../../../redux/actions';

const mapStateToInputProps = state => ({
    isDataLoaded: state.isDataLoaded
});

const mapDispatchToInputProps = dispatch => ({
    handleChange: query => dispatch(setSearchQuery(query))
});

const SearchInput = connect(
    mapStateToInputProps,
    mapDispatchToInputProps
)(Input);

export default SearchInput;