import React from 'react';
import { Icon } from '..';

interface ExerciseProps {
    title: string;
    counts: string;
    onClick: () => void;
}

export const Exercise: React.FC<ExerciseProps> = ({ title, counts, onClick }) => {
    return (
        <li className="hover:bg-primary-lighter transition-colors delay-100" onClick={onClick}>
            <a className="flex flex-row">
                <Icon icon="trophy" className="m-2" size="lg" />
                <div className="w-full">
                    <p className="text-lg font-semibold">{title}</p>
                    <p className="text-base font-normal">{counts}</p>
                </div>
            </a>
        </li>
    );
};
