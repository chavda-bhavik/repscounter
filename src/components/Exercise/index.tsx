import React from 'react';

interface ExerciseProps {
    title: string;
    calories: number;
    onClick: () => void;
}

export const Exercise: React.FC<ExerciseProps> = ({ title, calories, onClick }) => {
    return (
        <li
            className="hover:bg-primary-lighter cursor-pointer transition-colors delay-100 rounded-md"
            onClick={onClick}
        >
            <a className="flex flex-row p-3 items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full mr-2"></div>
                <div className="w-full">
                    <p className="text-base my-0 font-semibold">
                        {title}
                        &nbsp;
                        <span className="text-sm italic font-normal">({calories} Calories)</span>
                    </p>
                </div>
            </a>
        </li>
    );
};
