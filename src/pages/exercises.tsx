import React, { useState, useEffect } from 'react';

import { Exercise } from '@/components/Exercise';
import { FixedButton } from '@/components/FixedButton';
import { ExerciseModal } from '@/components/ExerciseModal';
import { MainContainer } from '@/components/MainContainer';
import { useAppDispatch, useAppSelector } from '@/store';
import {
    fetchExercises,
    addExercise,
    updateExercise,
    removeExercise,
} from '@/store/exercises/Actions';
import { useKeyPress } from '@/hooks/useKeyPress';
import { Alert } from '@/components/Alert';

const Exercices: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState<ExerciseType>();
    // keyPress hooks
    const addClicked = useKeyPress({ userKeys: ['+'] });
    const escapClicked = useKeyPress({ userKeys: ['Escape'] });

    const { exercises, loading, errorMessage } = useAppSelector((state) => state.exercise);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchExercises());
    }, []);

    // effect to run on key press
    useEffect(() => {
        if (addClicked && !showModal) setShowModal(true);
        if (escapClicked && showModal) setShowModal(false);
    }, [addClicked, escapClicked]);

    const onSubmitExercise = (data: ExerciseType) => {
        data.calories = Number(data.calories);
        if (selectedExercise) {
            dispatch(updateExercise(selectedExercise.id!, data));
        } else {
            dispatch(addExercise(data));
        }
        onClose();
    };
    const onDeleteExercise = (id: number) => {
        dispatch(removeExercise(id));
        onClose();
    };
    const onExerciseClick = (exercise: ExerciseType) => {
        setSelectedExercise(exercise);
        setShowModal(true);
    };
    const onClose = () => {
        setShowModal(false);
        setSelectedExercise(undefined);
    };

    return (
        <>
            <MainContainer loading={loading}>
                {errorMessage ? <Alert text={errorMessage} /> : null}
                <ul className="bg-base-200 border-2 border-primary-dark shadow-md p-2 rounded-xl">
                    {exercises
                        .slice()
                        .sort((a, b) => a.id! - b.id!)
                        .map((exercise) => (
                            <Exercise
                                onClick={() => onExerciseClick(exercise)}
                                key={exercise.id}
                                title={exercise.name}
                                calories={exercise.calories}
                            />
                        ))}
                </ul>
            </MainContainer>
            <FixedButton dataCy="add" onClick={() => setShowModal(true)} />
            <ExerciseModal
                show={showModal}
                onClose={onClose}
                onSubmit={onSubmitExercise}
                onDelete={onDeleteExercise}
                selectedExercise={selectedExercise}
            />
        </>
    );
};

export default Exercices;
