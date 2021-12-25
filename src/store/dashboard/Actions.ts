import client from '@/client';
import { AppDispatch } from '..';
import { error, loading, calories } from './index';
import { formatDateToString } from '@/utils/helper';

export const getCalories =
    (dateStart: Date, dateEnd: Date) => async (dispatch: AppDispatch) => {
        try {
            dispatch(loading());
            let result = await client.calories({
                dateEnd: formatDateToString(dateEnd),
                dateStart: formatDateToString(dateStart),
            });
            let calculatedCalories: number[] = [];
            let newStartDate = dateStart, newEndDate = dateEnd, formattedDate = '';
            while (newStartDate <= newEndDate) {
                formattedDate = formatDateToString(newStartDate);
                calculatedCalories.push(result.calories.find(calory => calory.date === formattedDate)?.calories || 0);
                newStartDate.setDate(newStartDate.getDate() + 1);
            }
            dispatch(
                calories({
                    calories: calculatedCalories,
                })
            );
        } catch (err) {
            dispatch(error((err as Error).message));
        }
    };