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
}) => {
    const inputContent = () => {
        switch (type) {
            case 'select':
                return <select className="input input-bordered select-accent">{children}</select>;
            default:
                return (
                    <input
                        type={type}
                        placeholder={placeholder}
                        min={min}
                        max={max}
                        className={classNames('input input-accent input-bordered', className)}
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
        </div>
    );
};
