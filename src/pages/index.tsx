import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Count } from '@/components/Count';
import { CountExercisesModal } from '@/components/CountExercisesModal';
import { MainContainer } from '@/components/MainContainer';
import { Backdrop } from '@/components/Backdrop';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCounts, addCount, updateCount, removeCount } from '@/store/counts/Actions';
import { fetchExercises } from '@/store/exercises/Actions';
import { useKeyPress } from '@/hooks/useKeyPress';
import { FixedButton } from '@/components/FixedButton';
import { formatDateToString } from '@/utils/helper';
import { Alert } from '@/components/Alert';

interface UpdateCountData {
    countId: string;
    key: 'sets' | 'reps' | 'kg' | 'exerciseId';
    value?: number | string;
}

const Home: React.FC = () => {
    const [showExercises, setShowExercises] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState<string>();
    const [updateCountData, setUpdateCountData] = useState<UpdateCountData>();
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState(new Date());
    // keyPress hooks
    const addClicked = useKeyPress({ userKeys: ['+'] });
    const escapClicked = useKeyPress({ userKeys: ['Escape'] });
    const slashClicked = useKeyPress({ userKeys: ['/'] });
    // store hooks
    const { counts, loading, errorMessage } = useAppSelector((state) => state.count);
    const { exercises } = useAppSelector((state) => state.exercise);
    const dispatch = useAppDispatch();

    // effect to fetch exercises
    useEffect(() => {
        dispatch(fetchExercises());
    }, []);
    // effect to fetch counts on date change
    useEffect(() => {
        dispatch(fetchCounts(date.toISOString()));
    }, [date]);
    // effect to run on key press
    useEffect(() => {
        if (addClicked && !showExercises && !showCalendar && !updateCountData)
            setShowExercises(true);
        if (escapClicked && showExercises) setShowExercises(false);
        if (escapClicked && showCalendar) setShowCalendar(false);
        if (slashClicked && !showExercises && !showCalendar && !updateCountData)
            setShowCalendar(true);
    }, [addClicked, escapClicked, slashClicked]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (
                updateCountData &&
                updateCountData.countId &&
                updateCountData.key &&
                updateCountData.value
            ) {
                onCountUpdate(updateCountData.countId, updateCountData.key, updateCountData.value);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [updateCountData]);

    const onCountUpdate = (
        countId: string,
        key: 'exerciseId' | 'reps' | 'sets' | 'kg',
        value: number | string
    ) => {
        dispatch(updateCount(countId, key, value));
        setUpdateCountData(undefined);
        onCloseModal();
    };
    const onCountDelete = (id: string) => {
        dispatch(removeCount(id));
    };
    const onCountClick = (countId: string, exerciseId: string) => {
        setUpdateCountData({
            countId,
            key: 'exerciseId',
        });
        setSelectedExerciseId(exerciseId);
        setShowExercises(true);
    };
    const onCloseModal = () => {
        setSelectedExerciseId(undefined);
        setShowCalendar(false);
        setShowExercises(false);
    };
    const onExerciseSelect = (exerciseId: string) => {
        if (selectedExerciseId && updateCountData) {
            onCountUpdate(updateCountData.countId, 'exerciseId', exerciseId);
            setSelectedExerciseId(undefined);
            setShowExercises(false);
        } else {
            dispatch(
                addCount({
                    date: formatDateToString(date),
                    exerciseId,
                })
            );
            onCloseModal();
        }
    };
    const onCountDataChange = (countId: string, key: 'sets' | 'reps' | 'kg', value: string) => {
        if (isNaN(Number(value)) || Number(value) < 0) return;
        setUpdateCountData({
            countId,
            key,
            value: Number(value),
        });
    };
    const onDateChange = (date: Date) => {
        setDate(date);
        onCloseModal();
    };
    return (
        <>
            <MainContainer loading={loading}>
                {errorMessage ? <Alert text={errorMessage} className="mb-2" /> : null}
                <table className="w-full bg-primary-white py-3 shadow-lg rounded-box text-center text-lg font-medium">
                    <thead>
                        <tr className="bg-primary-dark text-white">
                            <th className="p-2 rounded-tl-xl" style={{ width: '10%' }}></th>
                            <th className="p-2" style={{ width: '45%' }}>
                                Exercise
                            </th>
                            <th className="p-2" style={{ width: '15%' }}>
                                Sets
                            </th>
                            <th className="p-2" style={{ width: '15%' }}>
                                Reps
                            </th>
                            <th className="p-2 rounded-tr-xl" style={{ width: '15%' }}>
                                KG
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-solid divide-gray-300 divide-y">
                        {counts.map((countItem) => (
                            <Count
                                key={countItem.id}
                                count={countItem}
                                onChange={onCountDataChange}
                                onDeleteClick={onCountDelete}
                                onCountClick={onCountClick}
                            />
                        ))}
                    </tbody>
                </table>
            </MainContainer>
            <FixedButton
                onClick={() => setShowExercises(true)}
                dataCy="add"
                icon="plus"
                className="right-20"
                disabled={loading}
            />
            <FixedButton
                onClick={() => setShowCalendar(true)}
                dataCy="calendar"
                icon="calendarF"
                size="md"
                className="p-2"
                disabled={loading}
            />
            <CountExercisesModal
                show={showExercises}
                onClose={onCloseModal}
                onSelect={onExerciseSelect}
                selectedExerciseId={selectedExerciseId}
                exercises={exercises}
            />
            <Backdrop show={showCalendar} onClose={onCloseModal}>
                <Calendar maxDate={new Date()} value={date} onChange={onDateChange} />
            </Backdrop>
        </>
    );
};

export default Home;
