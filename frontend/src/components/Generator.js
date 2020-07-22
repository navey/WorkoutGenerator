import React from 'react';

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
                LowerBack: 0
            },
            equipment : {
                Bench : false,
                Barbell : false,
                Dumbbell: false,
            }
        }
        this.updateMuscleState = this.updateMuscleState.bind(this);
        this.updateEquipmentState = this.updateEquipmentState.bind(this);
    }

    updateMuscleState(event){
        var muscles = {...this.state.muscles}
        muscles[event.target.id] = event.target.value;
        this.setState({muscles})
    }

    updateEquipmentState(event){
        var equipment = {...this.state.equipment}
        equipment[event.target.name] = !equipment[event.target.name];
        this.setState({equipment})
    }

    render(){
        return(
            <div className='generator-section' id='generator'>
                <div className='filter-bar'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend"><h1 className="category-header">Muscle Group</h1></FormLabel>
                        <FormGroup className="category-space">
                            <div className="muscle-bar">
                                <TextField required id="Chest" label="Chest" defaultValue="0" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="Shoulders" label="Shoulders" defaultValue="0" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="Triceps" label="Triceps" defaultValue="0" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="Biceps" label="Biceps" defaultValue="0" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="Traps" label="Traps" defaultValue="0" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="Lats" label="Lats" defaultValue="0" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="MiddleBack" label="Middle Back" defaultValue="0" onChange={this.updateMuscleState}/><br/><br/>
                                <TextField required id="LowerBack" label="Lower Back" defaultValue="0" onChange={this.updateMuscleState}/><br/><br/>
                            </div>
                        </FormGroup>

                        <FormLabel component="legend"><h1 className="category-header">Equipment</h1></FormLabel>
                        <FormGroup className="category-space">
                            <div className="equipment-bar">
                                <FormControlLabel
                                    control={<Checkbox checked={this.state.equipment.Bench} onChange={this.updateEquipmentState} name="Bench" />}
                                    label="Bench"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={this.state.equipment.Barbell} onChange={this.updateEquipmentState} name="Barbell" />}
                                    label="Barbell"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={this.state.equipment.Dumbbell} onChange={this.updateEquipmentState} name="Dumbbell" />}
                                    label="Dumbbell"
                                />
                            </div>
                        </FormGroup>

                        <Button variant="contained" color="primary">Generate</Button>
                    </FormControl>
                </div>
            </div>
        );
    }
}