import React from 'react';
import { CountType } from '@/interfaces';

interface CountProps {
    count: CountType;
    onDeleteClick: (id: number) => void;
    onCountClick: (id: number) => void;
}

export const Count: React.FC<CountProps> = ({ count, onDeleteClick, onCountClick }) => {
    return (
        <tr className="hover:bg-primary-lighter cursor-pointer transition-colors delay-100 rounded-md text-center">
            <td className="p-2">
                <button className="btn btn-error btn-sm" onClick={() => onDeleteClick(count.id!)}>
                    X
                </button>
            </td>
            <td className="p-2 text-lg font-medium" onClick={() => onCountClick(count.exerciseId!)}>
                {count.exercise?.name}
            </td>
            <td
                className="p-2 focus:ring-2 ring-offset-2 ring-offset-green-500 ring-success"
                contentEditable
                placeholder="-"
            ></td>
            <td className="p-2" contentEditable placeholder="-">
                {count.reps}
            </td>
            <td className="p-2" contentEditable placeholder="-">
                {count.sets}
            </td>
        </tr>
    );
};
