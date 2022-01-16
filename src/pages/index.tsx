import React, { useEffect, useState, lazy, Suspense } from 'react';
import 'react-calendar/dist/Calendar.css';

import { Count } from '@/components/Count';
import { MainContainer } from '@/components/MainContainer';
import { Backdrop } from '@/components/Backdrop';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCounts, addCount, updateCount, removeCount } from '@/store/counts/Actions';
import { fetchExercises } from '@/store/exercises/Actions';
import { useKeyPress } from '@/hooks/useKeyPress';
import { FixedButton } from '@/components/FixedButton';
import { formatDateToString } from '@/utils/helper';

const LazyCountExerciseModal = lazy(() => import('@/components/CountExercisesModal'));
const LazyCalendar = lazy(() => import('react-calendar'));

const Home: React.FC = () => {
    const [showExercises, setShowExercises] = useState(false);
    const [exerciseUpdateData, setExerciseUpdateData] = useState<UpdateExerciseData>();
    const [formattedExercises, setFormattedExercises] = useState<{ [key: string]: string }>({});
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState(new Date());

    // keyPress hooks
    const addClicked = useKeyPress({ userKeys: ['+'] });
    const escapClicked = useKeyPress({ userKeys: ['Escape'] });
    const slashClicked = useKeyPress({ userKeys: ['/'] });

    // store hooks
    const { counts, loading } = useAppSelector((state) => state.count);
    const { exercises } = useAppSelector((state) => state.exercise);
    const dispatch = useAppDispatch();

    // effect to fetch exercises
    useEffect(() => {
        dispatch(fetchExercises());
    }, []);
    // effect to fetch counts on date change
    useEffect(() => {
        dispatch(fetchCounts(formatDateToString(date)));
    }, [date]);
    // effect to run on key press
    useEffect(() => {
        if (addClicked && !showExercises && !showCalendar) setShowExercises(true);
        if (escapClicked && showExercises) setShowExercises(false);
        if (escapClicked && showCalendar) setShowCalendar(false);
        if (slashClicked && !showExercises && !showCalendar) setShowCalendar(true);
    }, [addClicked, escapClicked, slashClicked]);
    // setting formatted exercises
    useEffect(() => {
        if (Array.isArray(exercises) && exercises.length > 0) {
            let data: { [key: string]: string } = {};
            data = exercises.reduce((acc, curr) => {
                acc[curr.id!] = curr.name;
                return acc;
            }, data);
            setFormattedExercises(data);
        }
    }, [exercises]);

    const onCountUpdate = (
        countId: string,
        key: 'exerciseId' | 'reps' | 'sets' | 'kg',
        value: number | string
    ) => {
        dispatch(updateCount(countId, key, Number(value)));
        onCloseModal();
    };
    const onCountDelete = (id: string) => {
        dispatch(removeCount(id));
    };
    const onCountClick = (countId: string, exerciseId: string) => {
        setExerciseUpdateData({ countId, exerciseId });
        setShowExercises(true);
    };
    const onCloseModal = () => {
        setExerciseUpdateData(undefined);
        setShowCalendar(false);
        setShowExercises(false);
    };
    const onExerciseSelect = (exerciseId: string) => {
        if (exerciseUpdateData) {
            onCountUpdate(exerciseUpdateData.countId, 'exerciseId', exerciseId);
            setExerciseUpdateData(undefined);
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
        onCountUpdate(countId, key, value);
    };
    const onDateChange = (date: Date) => {
        setDate(date);
        onCloseModal();
    };
    return (
        <>
            <MainContainer loading={loading}>
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
                                exerciseName={formattedExercises[countItem.exerciseId!]}
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
            <Suspense fallback={null}>
                <LazyCountExerciseModal
                    show={showExercises}
                    onClose={onCloseModal}
                    onSelect={onExerciseSelect}
                    selectedExerciseId={exerciseUpdateData?.exerciseId}
                    exercises={exercises}
                />
            </Suspense>
            <Suspense fallback={null}>
                <Backdrop show={showCalendar} onClose={onCloseModal}>
                    <LazyCalendar maxDate={new Date()} value={date} onChange={onDateChange} />
                </Backdrop>
            </Suspense>
        </>
    );
};

export default Home;
