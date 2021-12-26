import client from '@/client';
import { AppDispatch } from '..';
import { error, loading, calories, targets } from './index';
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

export const getTargets =
    (dateStart: Date, dateEnd: Date) => async (dispatch: AppDispatch) => {
        try {
            dispatch(loading());
            let result = await client.targets({
                dateEnd: formatDateToString(dateEnd),
                dateStart: formatDateToString(dateStart),
            });
            let calculatedTargets: string[] = result.targets.map(target => target.target);
            let calculatedCalories: number[] = result.targets.map(target => target.calories);
            dispatch(
                targets({
                    targets: calculatedTargets,
                    targetCalories: calculatedCalories,
                })
            );
        } catch (err) {
            dispatch(error((err as Error).message));
        }
    };