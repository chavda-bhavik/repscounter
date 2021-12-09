import { useState } from 'react';
import type { NextPage } from 'next';
import {
    useCountsQuery,
    CountsDocument,
    useAddCountMutation,
    useDeleteCountMutation,
    useUpdateCountMutation,
} from '@/generated/graphql';

import { CountType } from '@/interfaces';
import { Exercise, Add, Header, AddCountModal, MainContainer } from '@/components';

const Home: NextPage = () => {
    const [counts, setCounts] = useState<CountType[]>([]);
    const [selectedCount, setSelectedCount] = useState<CountType>();
    const [addNew, setAddNew] = useState(false);

    const { data, loading, error } = useCountsQuery({
        skip: typeof window === undefined,
    });
    const [addCount, { loading: addCountLoading }] = useAddCountMutation();
    const [updateCount, { loading: updateCountLoading }] = useUpdateCountMutation();
    const [deleteCount, { loading: deleteCountLoading }] = useDeleteCountMutation();

    const onCountSubmit = (count: CountType, exerciseName: string) => {
        if (selectedCount) {
            updateCount({
                variables: {
                    id: Number(selectedCount.id!),
                    data: {
                        ...count,
                        sets: Number(count.sets),
                        reps: Number(count.reps),
                        exerciseId: Number(count.exerciseId),
                    },
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
                                        exercise: {
                                            __typename: 'Exercise',
                                            name: exerciseName,
                                        },
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
        } else {
            addCount({
                variables: {
                    data: {
                        ...count,
                        sets: Number(count.sets),
                        reps: Number(count.reps),
                        exerciseId: Number(count.exerciseId),
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
                                            exercise: {
                                                __typename: 'Exercise',
                                                name: exerciseName,
                                            },
                                        },
                                    ],
                                },
                            });
                        }
                    }
                },
            });
            onCloseModal();
        }
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
    const onClickCount = (count: CountType) => {
        setSelectedCount(count);
        setAddNew(true);
    };
    const onCloseModal = () => {
        setAddNew(false);
        setSelectedCount(undefined);
    };
    return (
        <>
            <Header />
            <MainContainer loading={loading}>
                <ul className="menu bg-primary-white border-2 border-primary-dark py-3 shadow-lg rounded-box">
                    <li className="menu-title">
                        <span>01/01/2021 (Monday)</span>
                    </li>
                    {data?.counts.map((count) => (
                        <Exercise
                            key={count.id}
                            title={count.exercise.name}
                            counts={`${count.sets} Sets x ${count.reps} Reps`}
                            onClick={() => onClickCount(count)}
                        />
                    ))}
                </ul>
            </MainContainer>
            <Add onClick={() => setAddNew(true)} />
            <AddCountModal
                show={addNew}
                onClose={onCloseModal}
                onSubmit={onCountSubmit}
                onDelete={onCountDelete}
                selectedCount={selectedCount}
            />
        </>
    );
};

export default Home;
