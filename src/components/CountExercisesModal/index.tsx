import React from 'react';

import { Backdrop } from '@/components/Backdrop';
import classNames from 'classnames';

interface CountExercisesModalProps {
    show: boolean;
    onClose: () => void;
    onSelect?: (exerciseId: string) => void;
    selectedExerciseId?: string;
    exercises?: ExerciseType[];
}

const CountExercisesModal: React.FC<CountExercisesModalProps> = ({
    show,
    onClose,
    onSelect,
    exercises,
    selectedExerciseId,
}) => {
    return (
        <Backdrop show={show} onClose={onClose}>
            <ul className="pb-7 sm:pb-0 divide-y-2 divide-gray-300">
                {exercises &&
                    exercises
                        .slice()
                        // .sort((a, b) => a.id! - b.id!)
                        .map((exercise) => (
                            <li
                                data-cy="exercise-item"
                                key={exercise.id}
                                onClick={() => onSelect && onSelect(exercise.id!)}
                                className={classNames(
                                    'flex items-center p-2 hover:bg-primary-highlight bg-opacity-20 transition-colors duration-300 rounded-sm cursor-pointer',
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
        </Backdrop>
    );
};

export default CountExercisesModal;