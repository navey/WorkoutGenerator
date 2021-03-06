import React from 'react';

import { AppBar, Toolbar, Typography, TextField, Button, Select, InputLabel, MenuItem } from '@material-ui/core';
import axios from 'axios';

export default class Admin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            equipment : [],
            exercises : [],
            postAddExercise : {
                exerciseName: "",
                muscleGroup: "",
                equipFirst: "0",
                equipSecond: "0",
                equipThird: "0"
            },
            deleteExercise : {
                exerciseName : ""
            },
            newEquipment : {
                equipmentName : ""
            },
            deleteEquipment : {
                equipmentName : ""
            } 
        };
        this.addExercise = this.addExercise.bind(this);
        this.updateAddExerciseState = this.updateAddExerciseState.bind(this);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.updateDeleteExercise = this.updateDeleteExercise.bind(this);
        this.addEquipment = this.addEquipment.bind(this);
        this.updateAddEquipment = this.updateAddEquipment.bind(this);
        this.deleteEquipment = this.deleteEquipment.bind(this);
        this.updateDeleteEquipment = this.updateDeleteEquipment.bind(this);
    }

    componentDidMount(){
        axios.all([
            axios.get('/api/exercise/'),
            axios.get('/api/equipment/')
        ])
        .then(response => {
            this.setState({
                exercises : response[0].data,
                equipment : response[1].data
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    addExercise(){
        console.log("Sending POST request...");
        console.log(this.state.postAddExercise["exerciseName"], this.state.postAddExercise["muscleGroup"], this.state.postAddExercise["equipFirst"], this.state.postAddExercise["equipSecond"], this.state.postAddExercise["equipThird"]);
        axios.post('/api/exercise/create_exercise', this.state.postAddExercise)
        .then(() => console.log("POST requested completed."))
        .catch(error => console.log(error));
    }

    updateAddExerciseState(event){
        var exercises = {...this.state.postAddExercise};
        exercises[event.target.name] = event.target.value;
        this.setState({postAddExercise : exercises});
    }

    deleteExercise(){
        console.log("Sending Delete request...");
        console.log(this.state.deleteExercise.exerciseName);
        axios.delete('/api/exercise/delete_exercise/' + this.state.deleteExercise.exerciseName)
        .then(() => console.log("DELETE requested completed."))
        .catch(error => console.log(error));
    }

    updateDeleteExercise(event){
        var exercises = {...this.state.deleteExercise};
        exercises[event.target.name] = event.target.value;
        this.setState({deleteExercise : exercises});
    }

    addEquipment(){
        console.log("Sending POST request...");
        console.log(this.state.newEquipment.equipmentName);
        axios.post('/api/equipment/create_equipment', this.state.newEquipment)
        .then(() => console.log("POST requested completed."))
        .catch(error => console.log(error));
    }

    updateAddEquipment(event){
        var equipment = {...this.state.newEquipment};
        equipment[event.target.name] = event.target.value;
        this.setState({newEquipment : equipment});
    }

    deleteEquipment(){
        console.log("Sending Delete request...");
        console.log(this.state.deleteEquipment.equipmentName);
        axios.delete('/api/equipment/delete_equipment/' + this.state.deleteEquipment.equipmentName)
        .then(() => console.log("DELETE requested completed."))
        .catch(error => console.log(error));
    }

    updateDeleteEquipment(event){
        var equipment = {...this.state.deleteEquipment};
        equipment[event.target.name] = event.target.value;
        this.setState({deleteEquipment : equipment});
    }

    render(){
        return(
            <div className="admin">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Workout Generator Admin Page
                        </Typography>
                    </Toolbar>
                </AppBar>

                <form className="admin-form">
                    <h1> Add Exercise: </h1>
                    <TextField
                        required
                        id="exerciseName"
                        name="exerciseName"
                        label="Exercise Name"
                        style={{ margin: 8 }}
                        placeholder="Name"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.updateAddExerciseState}
                    />
                    <TextField
                        required
                        id="muscleGroup"
                        name="muscleGroup"
                        label="Muscle Group"
                        style={{ margin: 8 }}
                        placeholder="Name"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.updateAddExerciseState}
                    />

                    <InputLabel id="equip1Label">Equipment 1</InputLabel>
                    <Select
                        labelId="equip1Label"
                        id="equipFirst"
                        name="equipFirst"
                        defaultValue = "0"
                        onChange={this.updateAddExerciseState}
                    >
                        <MenuItem value="0">None</MenuItem>
                        {
                            this.state.equipment.map(val => {
                                return <MenuItem key={val.equipment_name} value={val.equipment_id}>{val.equipment_name}</MenuItem>
                            })
                        }
                    </Select>

                    <InputLabel id="equip2Label">Equipment 2</InputLabel>
                    <Select
                        labelId="equip2Label"
                        id="equipSecond"
                        name="equipSecond"
                        defaultValue = "0"
                        onChange={this.updateAddExerciseState}
                    >
                        <MenuItem value="0">None</MenuItem>
                        {
                            this.state.equipment.map(val => {
                                return <MenuItem key={val.equipment_name} value={val.equipment_id}>{val.equipment_name}</MenuItem>
                            })
                        }
                    </Select>
                    
                    <InputLabel id="equip3Label">Equipment 3</InputLabel>
                    
                    <Select
                        labelId="equip3Label"
                        id="equipThird"
                        name="equipThird"
                        defaultValue = "0"
                        onChange={this.updateAddExerciseState}
                    >
                        <MenuItem value="0">None</MenuItem>
                        {
                            this.state.equipment.map(val => {
                                return <MenuItem key={val.equipment_name} value={val.equipment_id}>{val.equipment_name}</MenuItem>
                            })
                        }
                    </Select>
                    <br /><br />

                    <Button variant="contained" onClick={this.addExercise}>
                        Submit
                    </Button>
                </form>

                <form className="admin-form">
                    <h1> Delete Exercise: </h1>
                    <InputLabel id="deleteExerciseLabel">Exercise</InputLabel>
                    <Select
                        labelId="deleteExerciseLabel"
                        id="exerciseName"
                        name="exerciseName"
                        defaultValue = "0"
                        onChange={this.updateDeleteExercise}
                    >
                        <MenuItem value="0">None</MenuItem>
                        {
                            this.state.exercises.map(val => {
                                return <MenuItem key={val.exercise_name} value={val.exercise_id}>{val.exercise_name}</MenuItem>
                            })
                        }
                    </Select>
                    <br /><br />

                    <Button variant="contained" onClick={this.deleteExercise}>
                        Submit
                    </Button>
                </form>

                <form className="admin-form">
                    <h1> Add Equipment: </h1>
                    <TextField
                        required
                        id="equipmentName"
                        name="equipmentName"
                        label="Equipment Name"
                        style={{ margin: 8 }}
                        placeholder="Name"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.updateAddEquipment}
                    />

                    <Button variant="contained" onClick={this.addEquipment}>
                        Submit
                    </Button>
                </form>

                <form className="admin-form">
                    <h1> Delete Equipment: </h1>
                    <InputLabel id="deleteEquipLabel">Equipment</InputLabel>
                    <Select
                        labelId="deleteEquipLabel"
                        id="equipmentName"
                        name="equipmentName"
                        defaultValue = "0"
                        onChange={this.updateDeleteEquipment}
                    >
                        <MenuItem value="0">None</MenuItem>
                        {
                            this.state.equipment.map(val => {
                                return <MenuItem key={val.equipment_name} value={val.equipment_id}>{val.equipment_name}</MenuItem>
                            })
                        }
                    </Select>
                    <br /><br />

                    <Button variant="contained" onClick={this.deleteEquipment}>
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}