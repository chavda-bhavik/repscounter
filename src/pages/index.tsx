import React, { useState } from 'react';
import {
    useCountsQuery,
    CountsDocument,
    useAddCountMutation,
    useDeleteCountMutation,
    useUpdateCountMutation,
    useExercisesQuery,
} from '@/generated/graphql';

import { CountType } from '@/interfaces';
import { Header } from '@/components/Header';
import { Count } from '@/components/Count';
import { AddCountModal } from '@/components/AddCountModal';
import { MainContainer } from '@/components/MainContainer';
import { Icon } from '@/components/Icon';

const Home: React.FC = () => {
    const [selectedExerciseId, setSelectedExerciseId] = useState<number>();
    const [addNew, setAddNew] = useState(false);

    const { data: countsData, loading } = useCountsQuery();
    const { data: exercisesData } = useExercisesQuery();
    const [addCount] = useAddCountMutation();
    const [updateCount] = useUpdateCountMutation();
    const [deleteCount] = useDeleteCountMutation();

    const onCountUpdate = (countId: number, exerciseId: number, sets = null, reps = null) => {
        // updateCount({
        //     variables: {
        //         id: Number(selectedCount.id!),
        //         data: {
        //             ...count,
        //             sets: Number(count.sets),
        //             reps: Number(count.reps),
        //             exerciseId: Number(count.exerciseId),
        //         },
        //     },
        //     update: (cache, { data }) => {
        //         if (data && data.updateCount && data.updateCount.entity) {
        //             const cacheCounts = cache.readQuery<{ counts: CountType[] }>({
        //                 query: CountsDocument,
        //             });
        //             if (cacheCounts) {
        //                 const newCounts = cacheCounts.counts.map((c) => {
        //                     if (c.id === data.updateCount.entity!.id) {
        //                         return {
        //                             ...data.updateCount.entity,
        //                         };
        //                     }
        //                     return c;
        //                 });
        //                 cache.writeQuery({
        //                     query: CountsDocument,
        //                     data: {
        //                         counts: newCounts,
        //                     },
        //                 });
        //             }
        //         }
        //     },
        // });
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
    const onCountClick = (exerciseId: number) => {
        setSelectedExerciseId(exerciseId);
        setAddNew(true);
    };
    const onCloseModal = () => {
        setSelectedExerciseId(undefined);
        setAddNew(false);
    };
    const onExerciseSelect = (exerciseId: number) => {
        if (selectedExerciseId) {
            // update count
        } else {
            onAddCount(exerciseId);
        }
    };
    return (
        <>
            <Header />
            <MainContainer loading={loading}>
                <table className="w-full bg-primary-white rounded-t-box py-3 shadow-lg rounded-box">
                    <thead>
                        <tr className="bg-primary-dark text-white rounded-t-box">
                            <th className="p-2 rounded-tl-xl"></th>
                            <th className="p-2">Exercise</th>
                            <th className="p-2">KG</th>
                            <th className="p-2">Sets</th>
                            <th className="p-2 rounded-tr-xl">Reps</th>
                        </tr>
                    </thead>
                    <tbody className="divide-solid divide-gray-300 divide-y">
                        {countsData?.counts.map((countItem) => (
                            <Count
                                key={countItem.id}
                                count={countItem}
                                onDeleteClick={onCountDelete}
                                onCountClick={onCountClick}
                            />
                        ))}
                    </tbody>
                </table>
            </MainContainer>

            <button
                onClick={() => setAddNew(true)}
                className="bg-primary-dark rounded-full fixed bottom-5 right-5 p-1 transition-colors duration-200 cursor-pointer hover:bg-primary-lighter border-2 border-transparent hover:border-primary-dark group"
                data-cy="add"
            >
                <Icon
                    icon="plus"
                    className="text-primary-highlight group-hover:text-primary-dark"
                    size="lg"
                />
            </button>
            <AddCountModal
                show={addNew}
                onClose={onCloseModal}
                onSelect={onExerciseSelect}
                selectedExerciseId={selectedExerciseId}
                exercises={exercisesData?.exercises}
            />
        </>
    );
};

export default Home;
