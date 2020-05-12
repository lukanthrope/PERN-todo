const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes');

app.use(cors());
app.use(express.json());
app.use(router);

const port = 5000;

app.listen(port, () => {
    console.log(`running on port ${port}`)
});