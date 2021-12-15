import React, { useState } from 'react';

import { Exercise, Add, Header, ExerciseModal, MainContainer } from '@/components';
import {
    useAddExerciseMutation,
    useExercisesQuery,
    ExercisesDocument,
    useUpdateExerciseMutation,
    useDeleteExerciseMutation,
} from '@/generated/graphql';
import { ExerciseType } from '@/interfaces';

const Exercices: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState<ExerciseType>();

    // graphql functions
    const { loading, data, error } = useExercisesQuery({
        skip: typeof window === 'undefined',
    });
    const [addExerciseFn, { loading: addLoading }] = useAddExerciseMutation({
        notifyOnNetworkStatusChange: true,
    });
    const [updateExerciseFn, { loading: editLoading }] = useUpdateExerciseMutation({
        notifyOnNetworkStatusChange: true,
    });
    const [deleteExerciseFn, { loading: deleteLoading }] = useDeleteExerciseMutation();

    const onSubmitExercise = (data: ExerciseType) => {
        if (selectedExercise) {
            updateExerciseFn({
                variables: {
                    id: selectedExercise.id!,
                    data: {
                        ...data,
                        calories: Number(data.calories),
                    },
                },
                update: (cache, { data }) => {
                    if (data && data.updateExercise && data.updateExercise?.entity) {
                        const cacheExercises = cache.readQuery<{ exercises: ExerciseType[] }>({
                            query: ExercisesDocument,
                        });
                        if (cacheExercises) {
                            const exercises = cacheExercises.exercises.map((exercise) => {
                                if (exercise.id === data.updateExercise.entity!.id) {
                                    return data.updateExercise.entity;
                                }
                                return exercise;
                            });
                            cache.writeQuery({
                                query: ExercisesDocument,
                                data: { exercises },
                            });
                        }
                    }
                },
            });
        } else {
            addExerciseFn({
                variables: {
                    data: {
                        calories: Number(data.calories),
                        name: data.name,
                        target: data.target,
                    },
                },
                update: (cache, { data }) => {
                    if (data && data.addExercise?.entity) {
                        try {
                            let cacheExercises: any = cache.readQuery({ query: ExercisesDocument });
                            let newExercises = [...cacheExercises.exercises];
                            newExercises.push(data.addExercise.entity);
                            cache.writeQuery({
                                query: ExercisesDocument,
                                data: { exercises: newExercises },
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                },
            });
        }
        onClose();
    };
    const onDeleteExercise = (id: number) => {
        deleteExerciseFn({
            variables: {
                id,
            },
            update: (cache, { data }) => {
                if (data && data.deleteExercise) {
                    const cacheExercises = cache.readQuery<{ exercises: ExerciseType[] }>({
                        query: ExercisesDocument,
                    });
                    if (cacheExercises) {
                        const exercises = cacheExercises.exercises.filter(
                            (exercise) => exercise.id !== data.deleteExercise.id
                        );
                        cache.writeQuery({
                            query: ExercisesDocument,
                            data: { exercises },
                        });
                    }
                }
            },
        });
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
                <ul className="menu bg-base-200 border-2 border-primary-dark py-3 shadow-lg rounded-box">
                    <li className="menu-title" data-cy="exercisesList">
                        <span>Exercises</span>
                    </li>
                    {data &&
                        data.exercises &&
                        data.exercises.map((exercise) => (
                            <Exercise
                                onClick={() => onExerciseClick(exercise)}
                                key={exercise.id}
                                title={exercise.name}
                                counts={`Burns ${exercise.calories} Calories`}
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
                submitLoading={addLoading || editLoading}
                deleteLoading={deleteLoading}
            />
        </>
    );
};

export default Exercices;
