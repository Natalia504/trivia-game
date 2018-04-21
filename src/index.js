import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from '../reducer';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <Provider store={createStore(reducer, applyMiddleware(promiseMiddleware()))}>
            <App />
        </Provider>
    </Router>, document.getElementById('app')
);