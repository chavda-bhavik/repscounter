import client from '@/client';
import { v4 as uuid } from 'uuid';
import { AppDispatch } from '..';
import { error, loading, add, update, remove, counts } from './index';

export const fetchCounts =
    (date?: string, exerciseId?: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(loading());
            let result = await client.counts({
                date,
                exerciseId,
            });
            dispatch(
                counts({
                    counts: result.counts,
                    fetched: true,
                })
            );
        } catch (err) {
            dispatch(error((err as Error).message));
        }
    };

export const addCount = (data: CountType) => async (dispatch: AppDispatch) => {
    try {
        // dispatch(loading());
        let result = await client.addCount({
            data: {
                ...data,
                id: uuid()
            },
        });
        if (result.addCount.entity) {
            dispatch(
                add({
                    count: result.addCount.entity,
                })
            );
        }
    } catch (err) {
        dispatch(error((err as Error).message));
    }
};

export const updateCount =
    (countId: string, key: 'exerciseId' | 'reps' | 'sets' | 'kg', value: number | string) =>
    async (dispatch: AppDispatch) => {
        try {
            // dispatch(loading());
            let result = await client.updateCount({
                data: {
                    [key]: value,
                },
                id: countId,
            });
            if (result.updateCount.entity) {
                dispatch(
                    update({
                        count: result.updateCount.entity,
                    })
                );
            }
        } catch (err) {
            dispatch(error((err as Error).message));
        }
    };

export const removeCount = (countId: string) => async (dispatch: AppDispatch) => {
    try {
        // dispatch(loading());
        let result = await client.DeleteCount({
            id: countId,
        });
        if (result.deleteCount) {
            dispatch(
                remove({
                    countId,
                })
            );
        }
    } catch (err) {
        dispatch(error((err as Error).message));
    }
};
