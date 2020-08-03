const express = require('express');
const router = express.Router();

const dbConnection = require('../db.js');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : false}));

// GET

// Query All Exercise Objects
router.get("/", (req, res) => {
    let queryString = "SELECT * FROM Exercise";
    dbConnection.query(queryString, (error, rows, fields) => {
        if(error){
            res.sendStatus(404);
            return
        }
        res.json(rows);
    })
    console.log('Connected to /exercises');
});

// Query Exercises from specific Muscle Group
router.get("/search", (req, res) => {
    let queryString = "SELECT * FROM Exercise WHERE muscle_group = ? ";
    dbConnection.query(queryString, [req.query.muscleGroup], (error, rows, fields) => {
        if(error){
            res.sendStatus(500);
            return
        }
        res.json(rows);
    })
    console.log(`Connected to /exercises/${req.query.muscleGroup}`);
});

// Query specific Exercise given ID
router.get("/:id", (req, res) => {
    let queryString = "SELECT * FROM Exercise WHERE exercise_id = ?";
    dbConnection.query(queryString, [req.params.id], (error, rows, fields) => {
        if(error){
            res.sendStatus(500);
            return
        }
        res.json(rows);
    })
    console.log(`Connected to /exercises/${[req.params.id]}`);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST

// Insert new exercise and all exercise_equipment relationships into database
router.post("/create_exercise", (req, res) => {
    let queryString = "INSERT INTO Exercise (exercise_name, muscle_group) VALUES (?, ?);";
    dbConnection.query(queryString, [req.body.exerciseName, req.body.muscleGroup], (error) => {
        if(error){
            res.sendStatus(404);
            return;
        }
        else{
            console.log(req.body.exerciseName + " was added to the database.");
        }
    });

    queryString = "SELECT exercise_id FROM Exercise WHERE exercise_name = ?;";
    let exercise_id = 0;
    dbConnection.query(queryString, [req.body.exerciseName], (error, rows) => {
        if(error){
            res.sendStatus(404);
            return;
        }
        else{
            exercise_id = rows[0].exercise_id;
        }

        if(exercise_id > 0){
            if(req.body.equipFirst != 0){
                let firstQuery = "INSERT INTO Exercise_Equipment (exercise_id, equipment_id) VALUES (?, ?);";
                dbConnection.query(firstQuery, [exercise_id, req.body.equipFirst], (error) => {
                    if(error){
                        console.log(error);
                        return;
                    }
                    else{
                        console.log("   First Exercise_Equipment was added to the database.");   
                    }
                });
            }
            if(req.body.equipSecond != 0){
                let secondQuery = "INSERT INTO Exercise_Equipment (exercise_id, equipment_id) VALUES (?, ?);";
                dbConnection.query(secondQuery, [exercise_id, req.body.equipSecond], (error) => {
                    if(error){
                        console.log(error);
                        return;
                    }
                    else{
                        console.log("   Second Exercise_Equipment was added to the database.");   
                    }
                });
            }
            if(req.body.equipThird != 0){
                let thirdQuery = "INSERT INTO Exercise_Equipment (exercise_id, equipment_id) VALUES (?, ?);";
                dbConnection.query(thirdQuery, [exercise_id, req.body.equipThird], (error) => {
                    if(error){
                        console.log(error);
                        return;
                    }
                    else{
                        console.log("   Third Exercise_Equipment was added to the database.");   
                    }
                });
            }
        }
        else{
            return;
        }
    });

    res.end();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE

// Delete exercise from database
router.delete("/delete_exercise/:id", (req, res) => {
    let queryString = "DELETE FROM Exercise WHERE exercise_id = ?";
    dbConnection.query(queryString, [req.params.id], (error) => {
        if(error){
            res.send(404);
            return;
        }
        else{
            console.log(req.params.id + " was deleted from the Database.");
        }
    });
    
    res.end();
});

module.exports = router;