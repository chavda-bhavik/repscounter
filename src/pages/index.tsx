import type { NextPage } from 'next';
import { Exercise, Add, Header, AddCountModal } from '@/components';
import { useState } from 'react';

const Home: NextPage = () => {
    const [addNew, setAddNew] = useState(false);
    return (
        <>
            <Header />
            <main className="bg-primary-lighter h-full p-2">
                <ul className="menu bg-primary-white border-2 border-primary-dark py-3 shadow-lg rounded-box">
                    <li className="menu-title">
                        <span>01/01/2021 (Monday)</span>
                    </li>
                    <Exercise title="Biceps Sits Curls" counts="2 Sets x 12 Reps" />
                    <Exercise title="Biceps Sits Curls" counts="2 Sets x 12 Reps" />
                    <Exercise title="Biceps Sits Curls" counts="2 Sets x 12 Reps" />
                    <Exercise title="Biceps Sits Curls" counts="2 Sets x 12 Reps" />
                    <li className="menu-title">
                        <span>02/01/2021 (Tuesday)</span>
                    </li>
                    <Exercise title="Biceps Sits Curls" counts="2 Sets x 12 Reps" />
                    <Exercise title="Biceps Sits Curls" counts="2 sets x 12 Reps" />
                    <Exercise title="Biceps Sits Curls" counts="2 sets x 12 Reps" />
                    <Exercise title="Biceps Sits Curls" counts="2 sets x 12 Reps" />
                </ul>
            </main>
            <Add onClick={() => setAddNew(true)} />
            <AddCountModal show={addNew} onClose={() => setAddNew(false)} />
        </>
    );
};

export default Home;
