import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getTodos, updateTodo } from '../actions';
import DialogModal from './DialogModal';

const TodoList = ({ 
    getTodos, 
    updateTodo, 
    todos, 
    isLoading, 
}) => {
    const [toEditList, setToEditList] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        getTodos();
    }, [getTodos]);

    const Find = (arr, index) => {
        let res = -1;
        arr.map((el, i) => 
            el.index === index ? res = i : res);
        return res;
    };

    const getText = (arr, index) => {
        let i = Find(arr, index);
        return arr[i].text;
    };

    const setText = (arr, index, text) => {
        let i = Find(arr, index);
        const newArr = [...arr];
        newArr[i] = { index, text };
        setToEditList([...newArr]);
    };

    const Edit = (index, id, text) => {
        if (Find(toEditList, index) === -1) {
            setToEditList([...toEditList, { index, text }]);
        }
        else {
            const text = getText(toEditList, index);
            updateTodo(id, text);
            if (index === 0)
                setToEditList(list => {
                    list.shift();
                    return list;
                });
            else
                setToEditList(list => list.splice(index, 1));
        }
    };

    const handleRemove = id => {
        setDeleteId(id);
        setShowDialog(true);
    };

    if (isLoading)
        return <CircularProgress />

    return (
        <div>
            { showDialog && <DialogModal id={deleteId} close={setShowDialog} /> }
            <ul className="todos">
                {todos && 
                todos.map((el, index) => 
                    <li key={el.todo_id} className="todo">
                        { Find(toEditList, index) === -1 ? 
                            <p>{el.description}</p> : 
                            <TextField 
                                className="big-input" 
                                id="standard-basic" 
                                label="edit"
                                value={getText(toEditList, index)}
                                onChange={e => setText(toEditList, index, e.target.value)}
                                />
                        }
                        <div>
                            <Button 
                                variant="contained" 
                                onClick={() => Edit(index, el.todo_id, el.description)}
                                >
                                    Update
                            </Button>
                            <Button 
                                onClick={() => handleRemove(el.todo_id)} 
                                variant="contained" 
                                color="secondary"
                                >
                                    Done
                            </Button>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}

const mapStateToProps = state => ({
    todos: state.get('todos'),
    isLoading: state.get('loading'),
});

const mapDispatchToProps = dispatch => ({
    getTodos: () => dispatch(getTodos()),
    updateTodo: (id, description) => dispatch(updateTodo(id, description)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);