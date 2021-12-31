import client from '@/client';
import { AppDispatch } from '..';
import { error, loading, remove, update, add, exercises } from './index';

export const fetchExercises = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(loading());
        let result = await client.exercises();
        dispatch(
            exercises({
                exercises: result.exercises,
                fetched: true,
            })
        );
    } catch (err) {
        dispatch(error((err as Error).message));
    }
};

export const addExercise = (data: ExerciseType) => async (dispatch: AppDispatch) => {
    try {
        // dispatch(loading());
        let result = await client.AddExercise({
            data,
        });
        if (result.addExercise.entity) {
            dispatch(
                add({
                    exercise: result.addExercise.entity,
                })
            );
        }
    } catch (err) {
        dispatch(error((err as Error).message));
    }
};

export const updateExercise =
    (exerciseId: number, data: ExerciseType) => async (dispatch: AppDispatch) => {
        try {
            // dispatch(loading());
            let result = await client.UpdateExercise({
                data,
                id: exerciseId,
            });
            if (result.updateExercise.entity) {
                dispatch(
                    update({
                        exercise: result.updateExercise.entity,
                    })
                );
            }
        } catch (err) {
            dispatch(error((err as Error).message));
        }
    };

export const removeExercise = (exerciseId: number) => async (dispatch: AppDispatch) => {
    try {
        // dispatch(loading());
        let result = await client.DeleteExercise({
            id: exerciseId,
        });
        if (result.deleteExercise) {
            dispatch(remove({ exerciseId }));
        }
    } catch (err) {
        dispatch(error((err as Error).message));
    }
};
