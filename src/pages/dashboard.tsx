import React from 'react';

import { MainContainer } from '@/components/MainContainer';
import { Calories } from '@/components/Dashboard/Calories';
import { Targets } from '@/components/Dashboard/Targets';
import { useOnlineStatus } from '@/hooks/useCheckOnline';
import { Alert } from '@/components/Alert';

const Dashboard: React.FC = () => {
    const isOnline = useOnlineStatus();
    return (
        <MainContainer>
            {!isOnline && (
                <Alert variant="info" text="Dashboard only works when Network is Available." />
            )}
            <div className="dashboard-container">
                <Calories />
                <Targets />
            </div>
        </MainContainer>
    );
};

export default Dashboard;
