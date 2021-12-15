import React from 'react';
import { Loader } from '..';
import classNames from 'classnames';

interface MainContainerProps {
    className?: string;
    loading?: boolean;
}

export const MainContainer: React.FC<MainContainerProps> = ({ children, className, loading }) => {
    return (
        <main className={classNames('bg-base-300 h-full p-2 flex-1', className)}>
            {loading ? (
                <div className="flex justify-center align-middle content-center items-center h-full p-2">
                    <Loader />
                </div>
            ) : (
                children
            )}
        </main>
    );
};
