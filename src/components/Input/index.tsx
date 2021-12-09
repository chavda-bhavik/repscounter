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
    register?: any;
    dataCy?: string;
    defaultValue?: string;
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
    dataCy,
    defaultValue,
    register,
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
                        data-cy={dataCy}
                        {...register}
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
                        data-cy={dataCy}
                        defaultValue={defaultValue}
                        className={classNames(
                            'input input-bordered',
                            {
                                'input-error': !!error,
                                'input-accent': !error,
                            },
                            className
                        )}
                        {...register}
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
