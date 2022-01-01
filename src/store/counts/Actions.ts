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
    let countToAdd = {
        ...data,
        id: uuid()
    }
    try {
        // dispatch(loading());
        let result = await client.addCount({
            data: countToAdd,
        });
        if (result.addCount.entity) {
            countToAdd = {
                ...result.addCount.entity
            }
        }
    } catch (err) {
        dispatch(error((err as Error).message));
    }
    dispatch(
        add({
            count: countToAdd
        })
    );
};

export const updateCount =
    (countId: string, key: 'exerciseId' | 'reps' | 'sets' | 'kg', value: number | string) =>
        async (dispatch: AppDispatch) => {
            let updateData = {
                [key]: value
            }
            let updatedCount: Partial<CountType> = {
                id: countId,
                [key]: value
            }
            try {
                // dispatch(loading());
                let result = await client.updateCount({
                    data: {
                        ...updateData
                    },
                    id: countId,
                });
                if (result.updateCount.entity) {
                    updatedCount = {
                        ...result.updateCount.entity
                    };
                }
            } catch (err) {
                dispatch(error((err as Error).message));
            }
            dispatch(
                update({
                    count: updatedCount
                })
            );
    };

export const removeCount = (countId: string) => async (dispatch: AppDispatch) => {
    try {
        // dispatch(loading());
        let result = await client.DeleteCount({
            id: countId,
        });
    } catch (err) {
        dispatch(error((err as Error).message));
    }
    dispatch(
        remove({
            countId,
        })
    );
};
