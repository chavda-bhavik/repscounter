import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { CountType } from '@/interfaces';
import { useExercisesQuery } from '@/generated/graphql';
import { formatDateToString } from '@/utils/helper';
import { Backdrop, Button, Input } from '..';

interface AddCountModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (count: CountType, exerciseName: string) => void;
    onDelete: (id: number) => void;
    selectedCount?: CountType;
}

export const AddCountModal: React.FC<AddCountModalProps> = ({
    show,
    onClose,
    onSubmit,
    onDelete,
    selectedCount,
}) => {
    const { data } = useExercisesQuery();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CountType>({
        defaultValues: {
            date: formatDateToString(new Date()),
            sets: 1,
            reps: 10,
        },
    });

    useEffect(() => {
        if (selectedCount) {
            reset({
                exerciseId: selectedCount.exerciseId,
                sets: selectedCount.sets,
                reps: selectedCount.reps,
                date: formatDateToString(new Date(selectedCount.date)),
            });
        }
    }, [selectedCount, reset]);

    useEffect(() => {
        if (!show) reset({});
    }, [reset, show]);

    const submitHandler = (count: CountType) => {
        const exercise = data?.exercises.find(
            (exercise) => exercise.id === Number(count.exerciseId)
        );
        if (exercise) onSubmit(count, exercise?.name);
    };

    return (
        <Backdrop show={show} onClose={onClose}>
            <div className="modal-box pb-12 sm:pb-6">
                <form onSubmit={handleSubmit(submitHandler)}>
                    <h3 className="display-3">Add Count</h3>
                    <Input
                        type="date"
                        label="Date"
                        required
                        error={errors.date?.message}
                        register={register('date', { required: 'Date is required' })}
                    />
                    <Input
                        type="select"
                        label="Exercise"
                        required
                        register={register('exerciseId', {
                            required: 'Please select an exercise',
                        })}
                        error={errors.exerciseId?.message}
                    >
                        <option disabled value="">
                            Select an Exercise
                        </option>
                        {data?.exercises.map((exercise) => (
                            <option key={exercise.id} value={exercise.id}>
                                {exercise.name}
                            </option>
                        ))}
                    </Input>
                    <Input
                        type="number"
                        label="Sets"
                        max={10}
                        min={1}
                        required
                        error={errors.sets?.message}
                        placeholder="4"
                        register={register('sets', {
                            required: 'Sets count required',
                            min: 1,
                            max: 10,
                        })}
                    />
                    <Input
                        type="number"
                        label="Reps"
                        max={100}
                        min={1}
                        error={errors.reps?.message}
                        required
                        placeholder="12"
                        register={register('reps', {
                            required: 'Reps count required!',
                            min: 1,
                            max: 100,
                        })}
                    />
                    <div className="modal-action">
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                        {selectedCount && (
                            <Button
                                type="button"
                                variant="error"
                                onClick={() => onDelete(selectedCount.id!)}
                            >
                                Delete
                            </Button>
                        )}
                        <Button type="button" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </Backdrop>
    );
};
