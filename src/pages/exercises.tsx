import { useState } from 'react';
import type { NextPage } from 'next';
import { Exercise, Add, Header, AddExerciseModal, MainContainer } from '@/components';

const Exercices: NextPage = () => {
    const [addNew, setAddNew] = useState(false);
    return (
        <>
            <Header />
            <MainContainer>
                <ul className="menu bg-base-200 border-2 border-primary-dark py-3 shadow-lg rounded-box">
                    <li className="menu-title">
                        <span>Exercises</span>
                    </li>
                    <Exercise title="Biceps Sits Curls" counts="2 Sets x 12 Reps" />
                    <Exercise title="Biceps Sits Curls" counts="2 Sets x 12 Reps" />
                    <Exercise title="Biceps Sits Curls" counts="2 Sets x 12 Reps" />
                </ul>
            </MainContainer>
            <Add onClick={() => setAddNew(true)} />
            <AddExerciseModal show={addNew} onClose={() => setAddNew(false)} />
        </>
    );
};

export default Exercices;
