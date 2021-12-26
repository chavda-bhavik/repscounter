import React from 'react';

import { MainContainer } from '@/components/MainContainer';
import { Calories } from '@/components/Dashboard/Calories';
import { Targets } from '@/components/Dashboard/Targets';

const Dashboard: React.FC = () => {
    return (
        <MainContainer>
            <div className="dashboard-container">
                <Calories />
                <Targets />
            </div>
        </MainContainer>
    );
};

export default Dashboard;
