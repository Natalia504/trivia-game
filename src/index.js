import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducer';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <Provider store={createStore(reducer)}>
            <App />
        </Provider>
    </Router>, document.getElementById('app')
);