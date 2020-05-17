import axios from 'axios';
import { 
    GET_TODOS,
    UPDATE_TODO,
    ADD_TODO,
    REMOVE_TODO,
    SET_LOADER 
 }  from '../actions/names';

export const setLoader = () => dispatch => dispatch({ type: SET_LOADER });

export const getTodos = () => async dispatch => {
    try {    
        dispatch(setLoader());
        const res = await axios.get('/todos');
        dispatch(setLoader());
        return dispatch({
            type: GET_TODOS,
            payload: {
                todos: res.data,
            },
        });
    } catch(err) {
        console.log(err);
    }
};

export const addTodo = description => async dispatch => {
    try {
        dispatch(setLoader());
        const res = await axios.post('/todos', { description });
        dispatch(setLoader());

        return dispatch({
            type: ADD_TODO,
            payload: {
                todo: res.data,
            },
        });
    } catch(err) {
        console.log(err);
    }
};

export const removeTodo = id => async dispatch => {
    try {
        dispatch(setLoader());
        await axios.delete(`/todos/${id}`);
        dispatch(setLoader());
        
        return dispatch({
            type: REMOVE_TODO,
            payload: {
                id,
            },
        });
    } catch(err) {
        console.log(err);
    }
};

export const updateTodo = (id, description) => async dispatch => {
    try {
        dispatch(setLoader());
        await axios.put(`/todos/${id}`, { 
            description
        });
        dispatch(setLoader());
        return dispatch({
            type: UPDATE_TODO,
            payload: {
                description,
                id,
            },
        });
    } catch(err) {
        console.log(err);
    } 
};