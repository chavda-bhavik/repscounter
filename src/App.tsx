import React from 'react';
import { Route, Switch } from 'wouter';

import { Layout } from '@/components/Layout';

// pages
import Exercises from './pages/exercises';
import Counts from './pages/index';
import Dashboard from './pages/dashboard';
import { Header } from './components/Header';

function App() {
    return (
        <Layout>
            <Header />
            <Switch>
                <Route path="/" component={Counts} />
                <Route path="/exercises" component={Exercises} />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </Layout>
    );
}

export default App;
