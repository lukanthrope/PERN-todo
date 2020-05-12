import { createStore, applyMiddleware } from 'redux';
import { Map as IMap } from 'immutable';
import thunk from 'redux-thunk';
import { reducer } from '../reducers';

const initialState =  new IMap({
    loading: false,
    todos: [],
});

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;