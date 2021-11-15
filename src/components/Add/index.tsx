import React from 'react';
import { Icon } from '..';

interface AddProps {
    onClick?: () => void;
}

export const Add: React.FC<AddProps> = ({ onClick = () => {} }) => {
    return (
        <button
            onClick={onClick}
            className="bg-primary-dark rounded-full fixed bottom-5 right-5 p-1 transition-colors duration-200 cursor-pointer hover:bg-base-100 border-2 border-transparent hover:border-primary-dark group"
        >
            <Icon
                icon="plus"
                className="text-primary-highlight group-hover:text-primary-dark"
                size="lg"
            />
        </button>
    );
};