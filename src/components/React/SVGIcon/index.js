import React from 'react';
import IconBus from './svg-icons/Bus';
import IconTram from './svg-icons/Tram';
import IconTrol from './svg-icons/Trol';
import IconSearch from './svg-icons/Search';
import IconList from './svg-icons/List';
import IconInfo from './svg-icons/Info';


const Icon = props => {
    switch (props.name) {
        case "bus":
            return <IconBus {...props} />
        case "trol":
            return <IconTrol {...props} />
        case "tram":
            return <IconTram {...props} />
        case "search":
            return <IconSearch {...props} />
        case "info":
            return <IconInfo {...props} />
        case "list":
            return <IconList {...props} />
        default:
            return <IconBus {...props} />
    }
}

export default Icon;