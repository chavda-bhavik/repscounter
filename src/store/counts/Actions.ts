import client from '@/client';
import { AppDispatch } from '..';
import { error, loading, add, update, remove, counts } from './index';

export const fetchCounts =
    (date?: string, exerciseId?: number) => async (dispatch: AppDispatch) => {
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
            data,
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
    (countId: number, key: 'exerciseId' | 'reps' | 'sets' | 'kg', value: number) =>
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

export const removeCount = (countId: number) => async (dispatch: AppDispatch) => {
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
