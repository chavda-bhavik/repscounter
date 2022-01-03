import React from 'react';
import { Loader } from '../Loader';
import classNames from 'classnames';

interface MainContainerProps {
    className?: string;
    loading?: boolean;
}

export const MainContainer: React.FC<MainContainerProps> = ({ children, className, loading }) => {
    return (
        <main className={classNames('bg-base-300 max-h-screen p-2 flex-1', className)}>
            {loading ? (
                <div className="flex justify-center align-middle content-center items-center sm:max-w-md p-2 mx-auto">
                    <Loader />
                </div>
            ) : (
                children
            )}
        </main>
    );
};
