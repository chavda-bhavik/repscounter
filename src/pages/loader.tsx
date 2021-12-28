import React from 'react';
import Avacado from '../assets/Avacado.svg?component';

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
    return (
        <div>
            <Avacado />
        </div>
    );
};

export default Loader;
