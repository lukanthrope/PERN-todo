import { 
    GET_TODOS,
    UPDATE_TODO,
    ADD_TODO,
    REMOVE_TODO,
    SET_LOADER 
 }  from '../actions/names';

function reducer(state, action) {
    switch(action.type) {
        case ADD_TODO: 
            return state.update('todos', todos => [...todos, action.payload.todo]);

        case GET_TODOS:
            return state.update('todos', todos => [ ...todos ,...action.payload.todos]);

        case UPDATE_TODO:
            return state.update('todos', todos => {
                const newTodos = todos.map(el => 
                    el.todo_id === action.payload.id ? 
                    el = { todo_id: action.payload.id, description: action.payload.description } : 
                    el
                )
                return [...newTodos];
            });

        case REMOVE_TODO:
            return state.update('todos', 
                todos => [
                    ...todos.filter(el => el.todo_id !== action.payload.id)
                ]
            );

        case SET_LOADER:
            return state.update('loading', loading => !loading);
            
        default:
            return state;
    }
}

export { reducer };