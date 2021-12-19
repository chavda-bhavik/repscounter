import React, { useEffect, useState } from 'react';
import {
    useCountsQuery,
    CountsDocument,
    useAddCountMutation,
    useDeleteCountMutation,
    useUpdateCountMutation,
    useExercisesQuery,
    CountInput,
} from '@/generated/graphql';

import { CountType } from '@/interfaces';
import { Header } from '@/components/Header';
import { Count } from '@/components/Count';
import { CountExercisesModal } from '@/components/CountExercisesModal';
import { MainContainer } from '@/components/MainContainer';
import { Icon } from '@/components/Icon';

interface UpdateCountData {
    countId: number;
    key: 'sets' | 'reps' | 'kg' | 'exerciseId';
    value?: number;
}

const Home: React.FC = () => {
    const [showExercises, setShowExercises] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState<number>();
    const [updateCountData, setUpdateCountData] = useState<UpdateCountData>();

    const [addCount] = useAddCountMutation();
    const [deleteCount] = useDeleteCountMutation();
    const [updateCount] = useUpdateCountMutation();
    const { data: exercisesData } = useExercisesQuery();
    const { data: countsData, loading } = useCountsQuery();

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
        // update count on backend
        updateCount({
            variables: {
                id: Number(countId),
                data,
            },
            update: (cache, { data }) => {
                if (data && data.updateCount && data.updateCount.entity) {
                    const cacheCounts = cache.readQuery<{ counts: CountType[] }>({
                        query: CountsDocument,
                    });
                    if (cacheCounts) {
                        const newCounts = cacheCounts.counts.map((c) => {
                            if (c.id === data.updateCount.entity!.id) {
                                return {
                                    ...data.updateCount.entity,
                                };
                            }
                            return c;
                        });
                        cache.writeQuery({
                            query: CountsDocument,
                            data: {
                                counts: newCounts,
                            },
                        });
                    }
                }
            },
        });
        onCloseModal();
    };
    const onAddCount = (exerciseId: number) => {
        addCount({
            variables: {
                data: {
                    date: new Date().toISOString(),
                    exerciseId: Number(exerciseId),
                },
            },
            update: (cache, { data }) => {
                if (data && data.addCount && data.addCount.entity) {
                    const cacheCounts = cache.readQuery<{ counts: CountType[] }>({
                        query: CountsDocument,
                    });
                    if (cacheCounts) {
                        cache.writeQuery({
                            query: CountsDocument,
                            data: {
                                counts: [
                                    ...cacheCounts.counts,
                                    {
                                        ...data.addCount.entity,
                                    },
                                ],
                            },
                        });
                    }
                }
            },
        });
        onCloseModal();
    };
    const onCountDelete = (id: number) => {
        deleteCount({
            variables: {
                id,
            },
            update: (cache, { data }) => {
                if (data && data.deleteCount && data.deleteCount) {
                    const cacheCounts = cache.readQuery<{ counts: CountType[] }>({
                        query: CountsDocument,
                    });
                    if (cacheCounts) {
                        cache.writeQuery({
                            query: CountsDocument,
                            data: {
                                counts: cacheCounts.counts.filter((c) => c.id !== id),
                            },
                        });
                    }
                }
                onCloseModal();
            },
        });
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
    return (
        <>
            <Header />
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
                        {countsData?.counts.map((countItem) => (
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
                className="bg-primary-dark rounded-full fixed bottom-5 right-5 p-1 transition-colors duration-200 cursor-pointer hover:bg-primary-lighter border-2 border-transparent hover:border-primary-dark group"
                data-cy="add"
            >
                <Icon
                    icon="plus"
                    className="text-primary-highlight group-hover:text-primary-dark"
                    size="lg"
                />
            </button>
            <CountExercisesModal
                show={showExercises}
                onClose={onCloseModal}
                onSelect={onExerciseSelect}
                selectedExerciseId={selectedExerciseId}
                exercises={exercisesData?.exercises}
            />
        </>
    );
};

export default Home;
