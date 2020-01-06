import React, { forwardRef } from 'react';
import SmoothScrollbar from 'react-smooth-scrollbar';

const withSmoothScrollbar = Component => forwardRef((props, ref) => (
    <SmoothScrollbar ref={ref} alwaysShowTracks>
        <Component {...props} />
    </SmoothScrollbar>
))

export default withSmoothScrollbar;