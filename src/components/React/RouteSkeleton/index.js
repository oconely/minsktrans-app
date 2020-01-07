import React from 'react';
import ContentLoader from 'react-content-loader';

const RouteSkeleton = ({ 
    height = 155, 
    width = 460, 
    speed = 2,
    primaryColor = "#f3f3f3",
    secondaryColor= "#ecebeb"
}) => (
    <ContentLoader 
        height={height}
        width={width}
        speed={speed}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
    >
	    <rect x="18" y="79" rx="0" ry="0" width="72" height="62" /> 
	    <rect x="20" y="21" rx="0" ry="0" width="235" height="22" /> 
	    <rect x="150" y="33" rx="0" ry="0" width="6" height="1" /> 
	    <rect x="114" y="81" rx="0" ry="0" width="352" height="15" /> 
	    <rect x="366" y="88" rx="0" ry="0" width="0" height="0" /> 
	    <rect x="114" y="108" rx="0" ry="0" width="261" height="14" /> 
	    <circle cx="438" cy="33" r="15" /> 
	    <circle cx="398" cy="33" r="15" />
    </ContentLoader>
);

export default RouteSkeleton;



