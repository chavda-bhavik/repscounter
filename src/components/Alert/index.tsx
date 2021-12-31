import classNames from 'classnames';
import React from 'react';
import { Icon } from '../Icon';

interface AlertProps {
    className?: string;
    text: string;
}

export const Alert: React.FC<AlertProps> = ({ className, text }) => {
    return (
        <div
            className={classNames(
                'rounded-box bg-red-200 border md:border-2 border-red-500 p-3',
                className
            )}
        >
            <div className="flex flex-row space-x-1">
                <Icon icon="alert" className="text-red-500" />
                <label className="font-semibold md:font-bold text-red-500">{text}</label>
            </div>
        </div>
    );
};
