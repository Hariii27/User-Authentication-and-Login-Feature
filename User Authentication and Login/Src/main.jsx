import React from 'react';
import ReactDom from 'reacr-dom/client';
import {BrowserRouter} from '/react-router-dom';
import {AuthProvider} from '/Context/authcontext';
import App from './App';

ReactDom.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);