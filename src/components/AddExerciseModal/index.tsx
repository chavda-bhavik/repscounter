import React from 'react';
import { Backdrop, Input } from '..';

interface AddExerciseModalProps {
    show: boolean;
    onClose: () => void;
}

export const AddExerciseModal: React.FC<AddExerciseModalProps> = ({ show, onClose }) => {
    return (
        <Backdrop show={show} onClose={onClose}>
            <div className="modal-box pb-12 sm:pb-6">
                <form>
                    <h3 className="display-3">Add Exercise</h3>
                    <Input
                        type="text"
                        label="Exercise Name"
                        placeholder="Barbell Bench Press"
                        required
                    />
                    <Input type="select" label="Target" required>
                        <option disabled selected>
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
                    <Input type="number" label="Calories Burn" required placeholder="120" />
                    <div className="modal-action">
                        <button type="button" className="btn btn-primary">
                            Add
                        </button>
                        <button type="button" className="btn">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Backdrop>
    );
};
