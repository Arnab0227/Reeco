import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './Components/App';
import store from './store/Store';
import { Provider } from 'react-redux';

const el = document.getElementById('root')
const root = createRoot(el)

root.render(
    <Provider store={store}>
        <App />
    </Provider>
    
);


