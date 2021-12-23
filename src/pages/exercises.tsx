import React, { useState, useEffect } from 'react';

import { Exercise } from '@/components/Exercise';
import { Add } from '@/components/Add';
import { Header } from '@/components/Header';
import { ExerciseModal } from '@/components/ExerciseModal';
import { MainContainer } from '@/components/MainContainer';
import { useAppDispatch, useAppSelector } from '@/store';
import {
    fetchExercises,
    addExercise,
    updateExercise,
    removeExercise,
} from '@/store/exercises/Actions';

const Exercices: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState<ExerciseType>();

    const { exercises, loading, errorMessage } = useAppSelector((state) => state.exercise);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchExercises());
    }, []);

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
            <Header />
            <MainContainer loading={loading}>
                <ul className="bg-base-200 border-2 border-primary-dark shadow-md p-2 rounded-xl">
                    {exercises.map((exercise) => (
                        <Exercise
                            onClick={() => onExerciseClick(exercise)}
                            key={exercise.id}
                            title={exercise.name}
                            calories={exercise.calories}
                        />
                    ))}
                </ul>
            </MainContainer>
            <Add onClick={() => setShowModal(true)} />
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
