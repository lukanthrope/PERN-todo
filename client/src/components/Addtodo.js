import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

const Addtodo = ({ addTodo }) => {
    const [inputData, setInputData] = useState(''); 

    const Submit = (e) => {
        e.preventDefault();
        if (inputData.trim() !== '') {
            addTodo(inputData);
            setInputData('');
        }
    }

    return (
        <form onSubmit={(e) => Submit(e)}>
            <TextField 
                className="big-input" 
                id="standard-basic" 
                label="I need to.." 
                value={inputData}
                onChange={e => setInputData(e.target.value)}
                />
            <Button variant="contained" color="primary" type="submit">
                ADD
            </Button>
        </form>
    );
}
const mapDispatchToProps = dispatch => ({
    addTodo: arg => dispatch(addTodo(arg)),
});

export default connect(null, mapDispatchToProps)(Addtodo);