import classNames from 'classnames';
import React from 'react';
import { Icon } from '../Icon';

interface FixedButtonProps {
    icon?: IconsType;
    size?: IconsSizesType;
    dataCy?: string;
    ariaLabel?: string;
    onClick?: () => void;
    className?: string;
}

export const FixedButton: React.FC<FixedButtonProps> = ({
    onClick = () => {},
    icon = 'plus',
    dataCy,
    ariaLabel,
    size = 'lg',
    className,
}) => {
    return (
        <button
            onClick={onClick}
            className={classNames(
                'bg-primary-dark rounded-full fixed bottom-5 right-5 p-1 transition-colors duration-200 cursor-pointer hover:bg-primary-lighter border-2 border-transparent hover:border-primary-dark group',
                className
            )}
            data-cy={dataCy}
            aria-label={ariaLabel}
        >
            <Icon
                icon={icon}
                className="text-primary-highlight group-hover:text-primary-dark"
                size={size}
            />
        </button>
    );
};
