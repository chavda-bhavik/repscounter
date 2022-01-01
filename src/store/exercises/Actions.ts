import client from '@/client';
import { v4 as uuid } from 'uuid';
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
    let exerciseToAdd = {
        ...data,
        id: uuid()
    }
    try {
        // dispatch(loading());
        let result = await client.AddExercise({
            data: {
                ...exerciseToAdd
            },
        });
        if (result.addExercise.entity) {
            exerciseToAdd = { ...result.addExercise.entity };
        }
    } catch (err) {
        dispatch(error((err as Error).message));
    }
    dispatch(
        add({
            exercise: {
                ...exerciseToAdd
            }
        })
    );
};

export const updateExercise =
    (exerciseId: string, data: ExerciseType) => async (dispatch: AppDispatch) => {
        let updateData = {
            ...data,
            id: exerciseId
        }
        try {
            // dispatch(loading());
            let result = await client.UpdateExercise({
                data,
                id: exerciseId,
            });
            if (result.updateExercise.entity) {
                updateData = { ...result.updateExercise.entity };
            }
        } catch (err) {
            dispatch(error((err as Error).message));
        }
        dispatch(
            update({
                exercise: { ...updateData }
            })
        );
    };

export const removeExercise = (exerciseId: string) => async (dispatch: AppDispatch) => {
    try {
        // dispatch(loading());
        await client.DeleteExercise({
            id: exerciseId,
        });
    } catch (err) {
        dispatch(error((err as Error).message));
    }
    dispatch(remove({ exerciseId }));
};
