import React from 'react';

import { Backdrop } from '@/components/Backdrop';
import { ExerciseType } from '@/interfaces';
import classNames from 'classnames';

interface AddCountModalProps {
    show: boolean;
    onClose: () => void;
    onSelect?: (exerciseId: number) => void;
    selectedExerciseId?: number;
    exercises?: ExerciseType[];
}

export const AddCountModal: React.FC<AddCountModalProps> = ({
    show,
    onClose,
    onSelect,
    exercises,
    selectedExerciseId,
}) => {
    return (
        <Backdrop show={show} onClose={onClose}>
            <div className="modal-box pb-12">
                <ul>
                    {exercises &&
                        exercises.map((exercise) => (
                            <li
                                key={exercise.id}
                                onClick={() => onSelect && onSelect(exercise.id!)}
                                className={classNames(
                                    'flex items-center p-2 hover:bg-primary-highlight bg-opacity-20 transition-colors duration-500 hover:shadow-md rounded-box',
                                    {
                                        'bg-success': exercise.id === selectedExerciseId,
                                    }
                                )}
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-green-500 rounded-full mr-2"></div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        {exercise.name}
                                    </h3>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </Backdrop>
    );
};
