import axios from 'axios';
import { 
    GET_TODOS,
    UPDATE_TODO,
    ADD_TODO,
    REMOVE_TODO,
    SET_LOADER 
 }  from '../actions/names';

export const getTodos = () => async dispatch => {
    try {    
        const res = await axios.get('/todos');

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
        const res = await axios.post('/todos', { description });

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
        await axios.delete(`/todos/${id}`);

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
        await axios.put(`/todos/${id}`, { 
            description
        });

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

export const setLoader = () => dispatch => dispatch({ type: SET_LOADER });