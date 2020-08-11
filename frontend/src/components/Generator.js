import React from 'react';
import axios from 'axios';

import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Button, TextField} from '@material-ui/core';

export default class Generator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            muscles : {
                Chest : 0,
                Shoulders : 0,
                Triceps : 0,
                Biceps : 0,
                Traps : 0,
                Lats: 0,
                MiddleBack: 0,
                LowerBack: 0,
                Quads: 0,
                Hamstring: 0,
                Calves: 0
            },
            equipmentList : [],
            equipment : {}
        }
        this.updateMuscleState = this.updateMuscleState.bind(this);
        this.updateEquipmentState = this.updateEquipmentState.bind(this);
        this.queryResults = this.queryResults.bind(this);
    }

    componentDidMount(){
        axios.get("/api/equipment")
        .then(response => {
            for(let item in response.data){
                this.setState(prevState => ({
                    equipment : {...prevState.equipment, [response.data[item].equipment_name] : true}
                }));
            }
            this.setState({
                equipmentList : response.data
            });
        })
        .catch(error => console.log(error));
    }

    updateMuscleState(event){
        var muscles = {...this.state.muscles};
        muscles[event.target.id] = event.target.value;
        this.setState({muscles});
    }

    updateEquipmentState(event){
        var equipment = {...this.state.equipment};
        equipment[event.target.name] = !equipment[event.target.name];
        this.setState({equipment});
    }

    queryResults(){
        console.log("Sending GET request for query...");
        let axiosGET = []; // hold all GET requests
        let muscleGroups = [];
        let htmlResults = "<h1> No exercises found. </h1>"; // default text for generator
        // iterate through all equipment states to see which equipment to blacklist
        let exEquipment = "";
        for(let equipment in this.state.equipment){
            if(!this.state.equipment[equipment]){
                exEquipment += `&exEquipment[]=${equipment}`;
            }
        }
        // iterate through all states to check is any muscle was selected
        // if so, add a GET request
        for(let muscle in this.state.muscles){
            if (this.state.muscles[muscle] > 0){
                console.log(`/api/exercise/search?muscleGroup=${muscle}${exEquipment}`); // console log for debugging
                axiosGET.push(axios.get(`/api/exercise/search?muscleGroup=${muscle}${exEquipment}`)); // add new GET request to my REST API
                muscleGroups.push(muscle);
            }
        }
        // perform all GET requests for the selected muscles
        // then, display all exercises
        axios.all(axiosGET)
        .then(response => {
            // iterate through all responses
            for(let i = 0; i < response.length; i++){
                if(i === 0) htmlResults = ""; // remove default message if at least one exercise exists
                let numOfExercises = this.state.muscles[muscleGroups[i]]; // get the number of exercises requested for the muscle group
                // if user requests more exercises than available, give all exercises available 
                if(numOfExercises >= response[i].data.length){
                    for(let j = 0; j < response[i].data.length; j++){
                        htmlResults += `<h1> ${response[i].data[j]['exercise_name']} - ${response[i].data[j]['muscle_group']} </h1> <br/>`;
                    }
                }
                // else give random exercises from the query result
                else{
                    for(let j = 0; j < numOfExercises; j++){
                        let index = Math.floor(Math.random() * response[i].data.length); // get random index
                        let selectedExercise = response[i].data.splice(index, 1); // remove the exercise after being selected
                        htmlResults += `<h1> ${selectedExercise[0]['exercise_name']} - ${selectedExercise[0]['muscle_group']} </h1> <br/>`;
                    }
                }
            }
            document.getElementById('muscle-generate').innerHTML = htmlResults;
        })
        .catch(error => console.log(error));
        console.log("GET request for query complete");
    }

    render(){
        return(
            <div className='generator-section' id='generator'>
                <div className='filter-bar'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend"><h1 className="category-header">Muscle Group</h1></FormLabel>
                        <FormGroup className="category-space">
                            <div className="muscle-bar">
                                <TextField required id="Chest" label="Chest" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="Shoulders" label="Shoulders" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="Triceps" label="Triceps" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="Biceps" label="Biceps" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="Traps" label="Traps" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="Lats" label="Lats" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="MiddleBack" label="Middle Back" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="LowerBack" label="Lower Back" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="Quads" label="Quads" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="Hamstring" label="Hamstring" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="Calves" label="Calves" onChange={this.updateMuscleState}/><br/><br/>
                            </div>
                        </FormGroup>

                        <FormLabel component="legend"><h1 className="category-header">Equipment</h1></FormLabel>
                        <FormGroup className="category-space">
                            <div className="equipment-bar">
                                {
                                    this.state.equipmentList.map(val => {
                                        return  <FormControlLabel
                                                    key = {val.equipment_name}
                                                    control={<Checkbox checked={this.state.equipment[val.equipment_name]} onChange={this.updateEquipmentState} name={val.equipment_name} />}
                                                    label={val.equipment_name}
                                                />
                                    })
                                }
                            </div>
                        </FormGroup>

                        <Button variant="contained" color="primary" onClick={this.queryResults}>Generate</Button>
                    </FormControl>
                </div>
                <div className='generator-results'>
                    <p id="muscle-generate"></p>
                </div>
            </div>
        );
    }
}