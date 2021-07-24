import React from 'react';
import {Col, Grid, Row} from "react-flexbox-grid";
import styled from "styled-components";

// this is the style for our text input
const InputObject = styled.input`
  // white duh
  background-color: white;
  
  // padding makes it look good
  padding: 15px;
  
  // text color contrasts
  color: black;
  
  // cool shadow right?
  box-shadow: 6px 6px 0 black;
  
  // border
  border: 2px solid black;
  
  // a slightly less annoying font
  font-family: 'Montserrat', sans-serif;
  
  // in a slightly less annoying weight
  font-weight: 400;
  
`;

// this is the icon for the input
const InputIcon = styled.div`
  // white duh
  background-color: white;

  // padding makes it look good
  padding: 15px;

  // text color contrasts
  color: black;

  // border
  border: 2px solid black;
  border-right: none;
  
  // cool shadow right?
  box-shadow: 6px 6px 0 black;
`;

// props for our input
interface InputProps {

}

// this is our basic button component
const Input: React.FC<InputProps> = props => {

    return (
        <Grid fluid>
            <Row center='xs' middle='xs'>
                <Col>
                    <InputIcon></InputIcon>
                </Col>

                <Col>
                    <InputObject type='text' />
                </Col>
            </Row>
        </Grid>
    );
}

export default Input;
