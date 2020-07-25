const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

// import Routes to Exercise
const exercise = require('./routes/exercise.js');
app.use('/api/exercise', exercise);

//import Routes to Equipment
const equipment = require('./routes/equipment.js');
app.use('/api/equipment', equipment);

app.get("/", (req, res) => {
    res.send("Hello World");
    console.log('Connected');
});

app.listen(port, () => console.log(`Listening at ${port}`));