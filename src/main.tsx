import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import client from './client';
import { ApolloProvider } from '@apollo/client';
import './styles/globals.css';

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
