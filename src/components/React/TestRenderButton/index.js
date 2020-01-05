import { connect } from 'react-redux';
import Button from '../Button';

const mapDispatchToButtonProps = dispatch => ({
    handleClick: () => dispatch({
        type: "TEST_RENDER" 
    })
});

const mapStateToButtonProps = state => ({
    active: state.testRender
})

const TestRenderButton = connect(
    mapStateToButtonProps,
    mapDispatchToButtonProps
)(Button);

export default TestRenderButton;