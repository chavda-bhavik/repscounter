import type { NextPage } from 'next';
import { Exercise, Add, Header, AddExerciseModal } from '@/components';
import { useState } from 'react';

const Exercices: NextPage = () => {
    const [addNew, setAddNew] = useState(false);
    return (
        <>
            <Header />
            <main className="bg-base-300 h-full p-2">
                <ul className="menu bg-base-200 border-2 border-primary-dark py-3 shadow-lg rounded-box">
                    <li className="menu-title">
                        <span>Exercises</span>
                    </li>
                    <Exercise title="Biceps Sits Curls" counts="2 Sets x 12 Reps" />
                    <Exercise title="Biceps Sits Curls" counts="2 Sets x 12 Reps" />
                    <Exercise title="Biceps Sits Curls" counts="2 Sets x 12 Reps" />
                    <Exercise title="Biceps Sits Curls" counts="2 Sets x 12 Reps" />
                </ul>
            </main>
            <Add onClick={() => setAddNew(true)} />
            <AddExerciseModal show={addNew} onClose={() => setAddNew(false)} />
        </>
    );
};

export default Exercices;
