import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CountProps {
    count: CountType;
    onChange: (countId: string, key: 'sets' | 'reps' | 'kg', value: string) => void;
    onDeleteClick: (id: string) => void;
    onCountClick: (countId: string, exerciseId: string) => void;
}

export const Count: React.FC<CountProps> = ({ count, onDeleteClick, onCountClick, onChange }) => {
    const nodeRef = useRef(null);
    useEffect(() => {
        gsap.to(nodeRef.current, {
            duration: 0.3,
            opacity: 1,
            // delay: (index + 1) * 0.1,
            // height: 'auto',
        });
    }, []);
    const onRemoveClick = (id: string) => {
        gsap.to(nodeRef.current, {
            opacity: 0,
            duration: 0.1,
            onComplete: () => onDeleteClick(id),
        });
        gsap.to(nodeRef.current, {
            duration: 0.1,
            height: 0,
        });
    };
    return (
        <tr
            className="hover:bg-primary-lighter cursor-pointer transition-colors delay-100 rounded-md opacity-0"
            ref={nodeRef}
            data-cy="count"
        >
            <td className="p-2">
                <button
                    className="btn btn-error btn-sm"
                    onClick={() => onRemoveClick(count.id!)}
                    data-cy="delete-count"
                >
                    X
                </button>
            </td>
            <td
                className="p-2"
                onClick={() => onCountClick(count.id!, count.exerciseId!)}
                data-cy="count-exercise"
            >
                {count.exercise?.name}
            </td>
            <td
                className="p-2"
                contentEditable
                suppressContentEditableWarning
                placeholder="-"
                onBlur={(e) =>
                    onChange(count.id!, 'sets', (e.target as HTMLTableCellElement).innerText)
                }
                data-cy="count-sets"
            >
                {count.sets}
            </td>
            <td
                className="p-2"
                contentEditable
                suppressContentEditableWarning
                placeholder="-"
                onBlur={(e) =>
                    onChange(count.id!, 'reps', (e.target as HTMLTableCellElement).innerText)
                }
                data-cy="count-reps"
            >
                {count.reps}
            </td>
            <td
                className="p-2"
                contentEditable
                suppressContentEditableWarning
                placeholder="-"
                onBlur={(e) =>
                    onChange(count.id!, 'kg', (e.target as HTMLTableCellElement).innerText)
                }
                data-cy="count-kg"
            >
                {count.kg}
            </td>
        </tr>
    );
};
