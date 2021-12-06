import classNames from 'classnames';
import React from 'react';

interface ButtonProps {
    disabled?: boolean;
    loading?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'error' | 'success' | 'warning' | 'info' | 'block' | 'link' | 'ghost';
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    disabled,
    loading,
    onClick,
    type,
    className,
    variant,
}) => {
    return (
        <button
            className={classNames(
                'btn',
                {
                    'btn-primary': variant === 'primary',
                    'btn-error': variant === 'error',
                    'btn-success': variant === 'success',
                    'btn-warning': variant === 'warning',
                    'btn-info': variant === 'info',
                    'btn-block': variant === 'block',
                    'btn-link': variant === 'link',
                    'btn-ghost': variant === 'ghost',
                    'btn-disabled': disabled,
                },
                {
                    loading: loading,
                },
                className
            )}
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
