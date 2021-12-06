import React, { useEffect } from 'react';
import { ExerciseType } from '@/interfaces';
import { useForm } from 'react-hook-form';
import { Backdrop, Input, Button } from '..';

interface ExerciseModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: ExerciseType) => void;
    onDelete: (id: number) => void;
    selectedExercise?: ExerciseType;
    submitLoading?: boolean;
    deleteLoading?: boolean;
}

export const ExerciseModal: React.FC<ExerciseModalProps> = ({
    show,
    onClose,
    onSubmit,
    onDelete,
    selectedExercise,
    submitLoading = false,
    deleteLoading = false,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ExerciseType>({
        defaultValues: {
            target: '',
        },
    });

    useEffect(() => {
        if (selectedExercise) {
            reset({
                name: selectedExercise.name,
                calories: selectedExercise.calories,
                target: selectedExercise.target,
            });
        }
    }, [selectedExercise, reset]);

    useEffect(() => {
        if (!show) reset({});
    }, [reset, show]);

    return (
        <Backdrop show={show} onClose={onClose}>
            <div className="modal-box pb-12 sm:pb-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="display-3">{selectedExercise ? 'Edit' : 'Add'} Exercise</h3>
                    <Input
                        type="text"
                        label="Exercise Name"
                        placeholder="Barbell Bench Press"
                        register={register('name', {
                            required: 'Exercise name is required',
                        })}
                        required
                        error={errors?.name?.message}
                    />
                    <Input
                        type="select"
                        label="Target"
                        required
                        register={register('target', {
                            required: 'Target is required',
                        })}
                        error={errors?.target?.message}
                    >
                        <option disabled value="">
                            Select Body Part
                        </option>
                        <option>Leg</option>
                        <option>Chest</option>
                        <option>Bieceps</option>
                        <option>Tieceps</option>
                        <option>Back</option>
                        <option>Shoulders</option>
                        <option>Arms</option>
                        <option>Abs</option>
                        <option>Core</option>
                        <option>Cardio</option>
                        <option>Other</option>
                    </Input>
                    <Input
                        type="number"
                        label="Calories Burn"
                        required
                        placeholder="120"
                        register={register('calories', {
                            required: 'Calories is required',
                            min: 1,
                        })}
                        error={
                            errors?.calories
                                ? errors?.calories.message || "Calories can't be less than 1"
                                : undefined
                        }
                    />
                    <div className="modal-action">
                        <Button type="submit" variant="primary" loading={submitLoading}>
                            Submit
                        </Button>
                        {selectedExercise && (
                            <Button
                                variant="error"
                                onClick={() => onDelete(selectedExercise.id!)}
                                loading={deleteLoading}
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
