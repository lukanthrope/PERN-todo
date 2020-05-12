const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch(err) {
        console.log(err.message);
    }
});

router.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch(err) {
        console.log(err.message);
    }
});

router.put('/todos/:id', async (req, res) => {
    try {
       const { id } = req.params;
       const { description } = req.body;
       await pool.query(
           "UPDATE todo SET description = $1 WHERE todo_id = $2", 
           [description, id]
       );
       res.json("updated");
    }catch(err) {
       console.log(err.message);
    }
});

router.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(
            "DELETE FROM todo * WHERE todo_id = $1", 
            [id]
        );
        res.json("removed");
    } catch(err) {
        console.log(err.message);
    }
});

router.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;