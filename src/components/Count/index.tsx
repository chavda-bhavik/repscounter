import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

import { CountType } from '@/interfaces';

interface CountProps {
    count: CountType;
    onChange: (countId: number, key: 'sets' | 'reps' | 'kg', value: string) => void;
    onDeleteClick: (id: number) => void;
    onCountClick: (countId: number, exerciseId: number) => void;
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
    const onRemoveClick = (id: number) => {
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
        >
            <td className="p-2">
                <button className="btn btn-error btn-sm" onClick={() => onRemoveClick(count.id!)}>
                    X
                </button>
            </td>
            <td className="p-2" onClick={() => onCountClick(count.id!, count.exerciseId!)}>
                {count.exercise?.name}
            </td>
            <td
                className="p-2"
                contentEditable
                suppressContentEditableWarning
                placeholder="-"
                onInput={(e) =>
                    onChange(count.id!, 'sets', (e.target as HTMLTableCellElement).innerText)
                }
            >
                {count.sets}
            </td>
            <td
                className="p-2"
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
                className="p-2"
                contentEditable
                suppressContentEditableWarning
                placeholder="-"
                onInput={(e) =>
                    onChange(count.id!, 'kg', (e.target as HTMLTableCellElement).innerText)
                }
            >
                {count.kg}
            </td>
        </tr>
    );
};
