import React from 'react';
import { Icon } from '../Icon';
import classNames from 'classnames';

interface AlertProps {
    className?: string;
    text: string;
    variant?: 'info' | 'error';
}

export const Alert: React.FC<AlertProps> = ({ className, text, variant = 'info' }) => {
    return (
        <div
            className={classNames(
                'rounded-box border md:border-2 p-3',
                {
                    'border-red-500 bg-red-200': variant === 'error',
                    'border-blue-500 bg-blue-200': variant === 'info',
                },
                className
            )}
        >
            <div className="flex flex-row space-x-1 items-center">
                <Icon
                    icon="alert"
                    className={classNames({
                        'text-red-500': variant === 'error',
                        'text-blue-500': variant === 'info',
                    })}
                />
                <label
                    className={classNames('font-semibold md:font-bold', {
                        'text-red-500': variant === 'error',
                        'text-blue-500': variant === 'info',
                    })}
                >
                    {text}
                </label>
            </div>
        </div>
    );
};
