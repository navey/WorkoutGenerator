import React from 'react';

import { AppBar, Toolbar, Typography, TextField, Button, Select, InputLabel, MenuItem } from '@material-ui/core';
import axios from 'axios';

export default class Admin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            equipment : []
        };
    }

    componentDidMount(){
        axios.get('/api/equipment/')
        .then(response => {
            this.setState({
                equipment : response.data
            });
        })
        .catch((error) => {
            console.error(error);
        });
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

                <form className="admin-form" action="/create_exercise" method="POST">
                    <h1> Add Exercise: </h1>
                    <TextField
                        required
                        id="exercise_input"
                        label="Exercise Name"
                        style={{ margin: 8 }}
                        placeholder="Name"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        required
                        id="muscle_group_input"
                        label="Muscle Group"
                        style={{ margin: 8 }}
                        placeholder="Name"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <InputLabel id="equip1_label">Equipment 1</InputLabel>
                    <Select
                        labelId="equip1_label"
                        id="equip_select"
                    >
                        <MenuItem value="">None</MenuItem>
                        {
                            this.state.equipment.map(val => {
                                return <MenuItem value={val.equipment_name}>{val.equipment_name}</MenuItem>
                            })
                        }
                    </Select>

                    <InputLabel id="equip2_label">Equipment 2</InputLabel>
                    <Select
                        labelId="equip2_label"
                        id="equip_select"
                    >
                        <MenuItem value="">None</MenuItem>
                        {
                            this.state.equipment.map(val => {
                                return <MenuItem value={val.equipment_name}>{val.equipment_name}</MenuItem>
                            })
                        }
                    </Select>
                    
                    <InputLabel id="equip3_label">Equipment 3</InputLabel>
                    <Select
                        labelId="equip3_label"
                        id="equip_select"
                    >
                        <MenuItem value="">None</MenuItem>
                        {
                            this.state.equipment.map(val => {
                                return <MenuItem value={val.equipment_name}>{val.equipment_name}</MenuItem>
                            })
                        }
                    </Select>
                    <br /><br />

                    <Button variant="contained">
                        Submit
                    </Button>
                </form>

                <form className="admin-form" action="/create_equipment" method="POST">
                    <h1> Add Equipment: </h1>
                    <TextField
                        required
                        id="equipment_input"
                        label="Equipment Name"
                        style={{ margin: 8 }}
                        placeholder="Name"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <Button variant="contained">
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}