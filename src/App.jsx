import React, {Component} from 'react';
import './App.scss';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from './store/store';
import Layout from './common/Layout';

export default class App extends Component {

    render() {
        return (
            <Provider store={configureStore()}>
                <BrowserRouter>
                    <Layout/>
                </BrowserRouter>
            </Provider>
        )
    }
}