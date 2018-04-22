import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers';

const Saga = createSagaMiddleware();

export default function configureStore() {
    return createStore(reducer, applyMiddleware(Saga))
}