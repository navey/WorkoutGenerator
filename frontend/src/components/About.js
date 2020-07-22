import React from 'react';

import react_img from '../images/react.png';
import node_img from '../images/node.jpg';
import materialui_img from '../images/materialui.png';
import express_img from '../images/express.jpeg';
import aws_img from '../images/aws.png';
import javascript_img from '../images/javascript.png'
import mysql_img from '../images/mysql.png'

export default class About extends React.Component {
    render(){
        return(
            <div className="about-section" id='about'>
                <h1 className='about-main-header'>How was this website built?</h1><br />
                <h1 className='about-header'>Frontend:</h1>
                <div>
                    <img src={react_img} alt='react'/>
                    <img src={materialui_img} alt='materialui'/> <br />
                </div>
                <h1 className='about-header'>Backend:</h1>
                <div>
                    <img src={node_img} alt='node'/>
                    <img src={express_img} alt='express'/> <br />
                </div>
                <h1 className='about-header'>Database:</h1>
                <div>
                    <img src={aws_img} alt='aws'/><br />
                </div>
                <h1 className='about-header'>Languages:</h1>
                <div>
                    <img src={javascript_img} alt='javascript'/>
                    <img src={mysql_img} alt='mysql' />
                </div>

            </div>
        );
    }
}