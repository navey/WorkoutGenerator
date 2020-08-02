import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-scroll';

export default class Navigation extends React.Component {
    
    render(){
        return(
            <AppBar position="static">
                <Toolbar>
                    <Grid
                    justify="space-between" 
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
                                <Link
                                    activeClass="active"
                                    to="generator"
                                    spy={true}
                                    smooth={true}
                                    offset={-10}
                                    duration={500}
                                    >
                                    Generator
                                </Link>
                            </Button>
                            <Button raised color="inherit" >
                                <Link
                                    activeClass="active"
                                    to="about"
                                    spy={true}
                                    smooth={true}
                                    offset={-10}
                                    duration={500}
                                    >
                                    About
                                </Link>
                            </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}