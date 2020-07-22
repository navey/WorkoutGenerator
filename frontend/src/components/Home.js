import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

export default class Home extends React.Component {
    render(){
        return(
            <Jumbotron>
                <h1>Welcome to the Workout Generator!</h1>
                <p>
                    Tired of planning out your workouts? Do you want to get in shape but don't know where to start?<br></br>
                    Well look no further!<br/>
                    Introducing the Workout Generator!<br/>
                    Scroll down to use the generator or click on "Generator" in the navigation bar.
                </p>
                <p>
                    <Button variant="primary">Learn More About How This Project Was Built</Button>
                </p>
            </Jumbotron>
        );
    }
}