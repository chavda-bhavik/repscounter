import React from 'react';
import { CountType } from '@/interfaces';

interface CountProps {
    count: CountType;
    onChange: (countId: number, key: 'sets' | 'reps' | 'kg', value: string) => void;
    onDeleteClick: (id: number) => void;
    onCountClick: (countId: number, exerciseId: number) => void;
}

export const Count: React.FC<CountProps> = ({ count, onDeleteClick, onCountClick, onChange }) => {
    return (
        <tr className="hover:bg-primary-lighter cursor-pointer transition-colors delay-100 rounded-md text-center">
            <td className="p-2">
                <button className="btn btn-error btn-sm" onClick={() => onDeleteClick(count.id!)}>
                    X
                </button>
            </td>
            <td
                className="p-2 text-lg font-medium"
                onClick={() => onCountClick(count.id!, count.exerciseId!)}
            >
                {count.exercise?.name}
            </td>
            <td
                className="p-2 text-lg font-medium"
                contentEditable
                suppressContentEditableWarning
                placeholder="-"
                onInput={(e) =>
                    onChange(count.id!, 'kg', (e.target as HTMLTableCellElement).innerText)
                }
            >
                {count.kg}
            </td>
            <td
                className="p-2 text-lg font-medium"
                contentEditable
                suppressContentEditableWarning
                placeholder="-"
                onInput={(e) =>
                    onChange(count.id!, 'reps', (e.target as HTMLTableCellElement).innerText)
                }
            >
                {count.reps}
            </td>
            <td
                className="p-2 text-lg font-medium"
                contentEditable
                suppressContentEditableWarning
                placeholder="-"
                onInput={(e) =>
                    onChange(count.id!, 'sets', (e.target as HTMLTableCellElement).innerText)
                }
            >
                {count.sets}
            </td>
        </tr>
    );
};
