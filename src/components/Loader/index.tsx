import React from 'react';
import './loader.css';
import { ReactComponent as Logo } from '../../assets/Avacado.svg';

interface LoaderProps {}

export const Loader: React.FC<LoaderProps> = ({}) => {
    return (
        <div className="w-full h-full">
            <Logo />
            <p className="text-center font-bold text-xl">Loading...</p>
        </div>
    );
};
