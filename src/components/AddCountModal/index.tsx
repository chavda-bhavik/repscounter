import React from 'react';
import { Backdrop, Input } from '..';

interface AddCountModalProps {
    show: boolean;
    onClose: () => void;
}

export const AddCountModal: React.FC<AddCountModalProps> = ({ show, onClose }) => {
    return (
        <Backdrop show={show} onClose={onClose}>
            <div className="modal-box pb-12 sm:pb-6">
                <form>
                    <h3 className="display-3">Add Count</h3>
                    <Input type="date" label="Date" required />
                    <Input type="select" label="Exercise" required>
                        <option disabled selected>
                            Select Exercise
                        </option>
                        <option>Bieceps Curls</option>
                        <option>Pull Over Curls</option>
                        <option>Bend Curls</option>
                    </Input>
                    <Input type="number" label="Sets" max={10} min={1} required placeholder="4" />
                    <Input type="number" label="Reps" max={100} min={1} required placeholder="12" />
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
