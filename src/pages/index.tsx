import React, { useEffect, useState } from 'react';
import { CountInput } from '@/generated/graphql';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Header } from '@/components/Header';
import { Count } from '@/components/Count';
import { CountExercisesModal } from '@/components/CountExercisesModal';
import { MainContainer } from '@/components/MainContainer';
import { Icon } from '@/components/Icon';
import { Backdrop } from '@/components/Backdrop';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCounts, addCount, updateCount, removeCount } from '@/store/counts/Actions';

interface UpdateCountData {
    countId: number;
    key: 'sets' | 'reps' | 'kg' | 'exerciseId';
    value?: number;
}

const Home: React.FC = () => {
    const [showExercises, setShowExercises] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState<number>();
    const [updateCountData, setUpdateCountData] = useState<UpdateCountData>();
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState(new Date());

    const { counts, loading, errorMessage } = useAppSelector((state) => state.count);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCounts(date.toISOString()));
    }, [date]);

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
        countId: number,
        key: 'exerciseId' | 'reps' | 'sets' | 'kg',
        value: number
    ) => {
        let data: CountInput = {
            [key]: value,
        };
        dispatch(updateCount(countId, key, value));
        onCloseModal();
    };
    const onAddCount = (exerciseId: number) => {
        addCount(exerciseId);
        onCloseModal();
    };
    const onCountDelete = (id: number) => {
        dispatch(removeCount(id));
    };
    const onCountClick = (countId: number, exerciseId: number) => {
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
    const onExerciseSelect = (exerciseId: number) => {
        if (selectedExerciseId && updateCountData) {
            setUpdateCountData({
                countId: updateCountData.countId,
                key: 'exerciseId',
                value: exerciseId,
            });
            setSelectedExerciseId(undefined);
            setShowExercises(false);
        } else {
            onAddCount(exerciseId);
        }
    };
    const onCountDataChange = (countId: number, key: 'sets' | 'reps' | 'kg', value: string) => {
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
            <Header />
            <MainContainer loading={false}>
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
            <button
                onClick={() => setShowExercises(true)}
                className="bg-primary-dark rounded-full fixed bottom-5 right-20 p-1 transition-colors duration-200 cursor-pointer hover:bg-primary-lighter border-2 border-transparent hover:border-primary-dark group"
                data-cy="add"
            >
                <Icon
                    icon="plus"
                    className="text-primary-highlight group-hover:text-primary-dark"
                    size="lg"
                />
            </button>
            <button
                onClick={() => setShowCalendar(true)}
                className="bg-primary-dark rounded-full fixed bottom-5 right-5 p-2 transition-colors duration-200 cursor-pointer hover:bg-primary-lighter border-2 border-transparent hover:border-primary-dark group"
                data-cy="calendar"
            >
                <Icon
                    icon="calendarF"
                    className="text-primary-highlight group-hover:text-primary-dark"
                    size="md"
                />
            </button>

            <CountExercisesModal
                show={showExercises}
                onClose={onCloseModal}
                onSelect={onExerciseSelect}
                selectedExerciseId={selectedExerciseId}
                exercises={[]}
            />

            <Backdrop show={showCalendar} onClose={onCloseModal}>
                <Calendar maxDate={new Date()} value={date} onChange={onDateChange} />
            </Backdrop>
        </>
    );
};

export default Home;
