import React from 'react';
import styled from "styled-components";

// this is the style for our button
const ButtonContainer = styled.div<{color: string}>`
  // pick a theme color
  background-color: var(--color-${props => props.color});
  
  // padding makes it look good
  padding: 20px;
  
  // text color contrasts
  color: var(--color-${props => props.color}-contrast);
  
  // cool shadow right?
  box-shadow: 6px 6px 0 black;
  
  // don't cut yourself on the edge
  transform: skewX(-15deg);
  
  // a slightly less annoying font
  font-family: 'Montserrat', sans-serif;
  
  // in a slightly less annoying weight
  font-weight: 400;
  
  // make sure the label isn't all tilt-y
  span {
    display: inline-block;
    transform: skewX(15deg);
  }
`;

// this is our basic button component
const Button : React.FC = props => {

    return <ButtonContainer color='yellow'>
        <span>
        PLAY <strong>ANONYMOUSLY</strong>
        </span>
    </ButtonContainer>
}

export default Button;
