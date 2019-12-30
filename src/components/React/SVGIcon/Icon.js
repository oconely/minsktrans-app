import React from 'react';
import { IconSanta } from './icons/IconSanta';

export const Icon = props => {
    switch (props.name) {
        case "bubles":
            return <IconSanta {...props} className="banner__icon" />
        default:
            return;
    }
}