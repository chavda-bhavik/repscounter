import React from 'react';
import { Route, Switch } from 'wouter';

import { Layout } from '@/components/Layout';

// pages
import Exercises from './pages/exercises';
import Counts from './pages/index';

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" component={Counts} />
                <Route path="/exercises" component={Exercises} />
            </Switch>
        </Layout>
    );
}

export default App;
