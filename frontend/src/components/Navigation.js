import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'

export default class Navigation extends React.Component {
    
    render(){
        return(
            <AppBar position="static">
                <Toolbar>
                    <Grid
                    justify="space-between" // Add it here :)
                    container 
                    spacing={24}
                    >
                        <Grid item>
                            <Typography variant="h6" color="inherit">
                            Workout Generator
                            </Typography>
                        </Grid>

                        <Grid item>
                            <div>
                            <Button raised color="inherit" >
                                Generator
                            </Button>
                            <Button raised color="inherit" >
                                About
                            </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}