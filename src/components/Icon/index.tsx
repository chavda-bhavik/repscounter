import React from 'react';
import classnames from 'classnames';

import { IconsType, IconsSizesType } from '@/interfaces';

const icons: any = {
    anchor: {
        viewBox: '-2 -2 24 24',
        path: (
            <path d="M16.93 11.998A1 1 0 0 1 17 10h2a1 1 0 0 1 0 2h-.055a9.001 9.001 0 0 1-17.89 0H1a1 1 0 0 1 0-2h2a1 1 0 0 1 .07 1.998A7.005 7.005 0 0 0 9 17.929V7.874A4.002 4.002 0 0 1 10 0a4 4 0 0 1 1 7.874v10.055a7.005 7.005 0 0 0 5.93-5.931zM10 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
        ),
    },
    dashboard: {
        viewBox: '-2 -5 24 24',
        path: (
            <path d="M.832 14A9.966 9.966 0 0 1 0 10C0 4.477 4.477 0 10 0s10 4.477 10 10a9.966 9.966 0 0 1-.832 4H.832zm16.916-2a8 8 0 1 0-15.497 0h15.497zM10 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM5 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm10 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-5-3a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V7a1 1 0 0 1 1-1z"></path>
        ),
    },
    taskList: {
        viewBox: '-2 -2 24 24',
        path: (
            <path d="M6 0h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6zm0 2a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4H6zm6 7h3a1 1 0 0 1 0 2h-3a1 1 0 0 1 0-2zm-2 4h5a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2zm0-8h5a1 1 0 0 1 0 2h-5a1 1 0 1 1 0-2zm-4.172 5.243L7.95 8.12a1 1 0 1 1 1.414 1.415l-2.828 2.828a1 1 0 0 1-1.415 0L3.707 10.95a1 1 0 0 1 1.414-1.414l.707.707z"></path>
        ),
    },
    trophy: {
        viewBox: '-7 -2 24 24',
        path: (
            <path d="M2.294 15c-.6-1.825-1.032-3.825-1.294-6-.362-3-.362-6 0-9h8c.311 3.329.311 6.329 0 9a32.729 32.729 0 0 1-1.287 6H8a2 2 0 0 1 2 2v3H0v-3a2 2 0 0 1 2-2h.294zM3 16v2h4v-2H3z"></path>
        ),
    },
    plus: {
        viewBox: '-4.5 -4.5 24 24',
        path: (
            <path d="M8.9 6.9v-5a1 1 0 1 0-2 0v5h-5a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z"></path>
        ),
    },
};

const sizes = {
    sm: 24,
    md: 32,
    lg: 40,
};

interface IconProps {
    icon: IconsType;
    size?: IconsSizesType;
    className?: string;
    fill?: string;
}

export const Icon: React.FC<IconProps> = ({ icon, size = 'md', className = '', fill }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={icons[icon].viewBox}
            width={sizes[size]}
            height={sizes[size]}
            preserveAspectRatio="xMinYMin"
            className={classnames(className, ' text-center')}
            fill="currentColor"
            role="img"
        >
            {icons[icon].path}
        </svg>
    );
};
