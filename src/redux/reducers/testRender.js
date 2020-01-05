const testRender = (state = false, action) => {
    switch (action.type) {
        case "TEST_RENDER":
            return !state;
        default:
            return state;
    }
}

export default testRender;