import classNames from 'classnames';
import React from 'react';

interface InputProps {
    label?: string;
    type?: 'text' | 'number' | 'date' | 'select';
    placeholder?: string;
    className?: string;
    required?: boolean;
    min?: number;
    max?: number;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    type,
    placeholder,
    className,
    min,
    max,
    required = false,
    children,
    error,
}) => {
    const inputContent = () => {
        switch (type) {
            case 'select':
                return (
                    <select
                        className={classNames(
                            'select input-bordered',
                            {
                                'select-error': !!error,
                                'select-accent': !error,
                            },
                            classNames
                        )}
                    >
                        {children}
                    </select>
                );
            default:
                return (
                    <input
                        type={type}
                        placeholder={placeholder}
                        min={min}
                        max={max}
                        className={classNames(
                            'input input-bordered',
                            {
                                'input-error': !!error,
                                'input-accent': !error,
                            },
                            className
                        )}
                    />
                );
                break;
        }
    };
    return (
        <div className="form-control">
            {label && (
                <label className="label">
                    <span className="label-text">
                        {label} {required && <span className="text-red-500">*</span>}
                    </span>
                </label>
            )}
            {inputContent()}
            {error && <p className="label-text text-error m-1 font-medium">{error}</p>}
        </div>
    );
};
