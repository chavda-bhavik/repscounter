import React from 'react';
import { Route, Switch } from 'wouter';

// Components
import { Layout } from '@/components/Layout';
import { Header } from './components/Header';
import { ReloadPrompt } from './components/ReloadPropmt';

// pages
import Exercises from './pages/exercises';
import Counts from './pages/index';
import Dashboard from './pages/dashboard';

function App() {
    return (
        <>
            <ReloadPrompt />
            <Layout>
                <Header />
                <Switch>
                    <Route path="/" component={Counts} />
                    <Route path="/exercises" component={Exercises} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </Layout>
        </>
    );
}

export default App;
