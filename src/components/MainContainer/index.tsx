import classNames from 'classnames';
import React from 'react';

interface MainContainerProps {
    className?: string;
}

export const MainContainer: React.FC<MainContainerProps> = ({ children, className }) => {
    return (
        <main className={classNames('bg-base-300 h-full p-2 flex-1', className)}>{children}</main>
    );
};
