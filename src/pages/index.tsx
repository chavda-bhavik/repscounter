import type { NextPage } from 'next';
import { Exercise, Add, Header, AddCountModal, MainContainer } from '@/components';
import { useState } from 'react';

const Home: NextPage = () => {
    const [addNew, setAddNew] = useState(false);
    return (
        <>
            <Header />
            <MainContainer>
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
            </MainContainer>
            <Add onClick={() => setAddNew(true)} />
            <AddCountModal show={addNew} onClose={() => setAddNew(false)} />
        </>
    );
};

export default Home;
