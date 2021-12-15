import { useEffect, useState } from 'react';
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
import { formatDateToString, groupBy } from '@/utils/helper';

interface GrouppedCountType {
    key: string;
    value: CountType[];
}

const Home: NextPage = () => {
    const [counts, setCounts] = useState<GrouppedCountType[]>([]);
    const [selectedCount, setSelectedCount] = useState<CountType>();
    const [addNew, setAddNew] = useState(false);

    const { data, loading, error } = useCountsQuery({
        skip: typeof window === undefined,
    });
    const [addCount] = useAddCountMutation();
    const [updateCount] = useUpdateCountMutation();
    const [deleteCount] = useDeleteCountMutation();

    useEffect(() => {
        if (data?.counts) {
            // @ts-ignore
            let newCounts = [...data.counts].sort((a, b) => new Date(a.date) - new Date(b.date));
            setCounts(groupBy(newCounts, (item) => item.date));
        }
    }, [data?.counts]);

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
                    {counts.reduce((data: any, count, i) => {
                        data.push(
                            <li className="menu-title" data-cy="countsList" key={count.key}>
                                <span>{formatDateToString(count.key, 'DD/MM/YYYY', true)}</span>
                            </li>
                        );
                        count.value.forEach((countItem) => {
                            data.push(
                                <Exercise
                                    key={countItem.id}
                                    title={countItem.exercise!.name!}
                                    counts={`${countItem.sets} Sets x ${countItem.reps} Reps`}
                                    onClick={() => onClickCount(countItem)}
                                />
                            );
                        });
                        return data;
                    }, [])}
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
