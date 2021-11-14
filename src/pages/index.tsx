import { Icon, Exercise } from '@/components';
import type { NextPage } from 'next';

const Home: NextPage = () => {
    return (
        <>
            <header className="navbar shadow-lg bg-primary-dark justify-between sticky top-0">
                <div className="flex-none">
                    <Icon icon="anchor" className="text-primary-highlight" />
                </div>
                <div className="flex-none space-x-5">
                    <Icon icon="dashboard" className="text-primary-lighter" />
                    <Icon icon="taskList" className="text-primary-lighter" />
                </div>
            </header>
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
            <div className="bg-primary-dark rounded-full fixed bottom-5 right-5 p-1 transition-colors duration-200 cursor-pointer hover:bg-primary-lighter border-2 border-transparent hover:border-primary-dark group">
                <Icon
                    icon="plus"
                    className="text-primary-highlight group-hover:text-primary-dark"
                    size="lg"
                />
            </div>
        </>
    );
};

export default Home;
