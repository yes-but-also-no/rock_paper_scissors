import React from 'react';
import styled from "styled-components";

// this is the style for our button
const ButtonContainer = styled.div<{color: string}>`
  // pick a theme color
  background-color: var(--color-${props => props.color});
  
  // padding makes it look good
  padding: 15px;
  
  // text color contrasts
  color: var(--color-${props => props.color}-contrast);
  
  // cool shadow right?
  box-shadow: var(--standard-shadow);
  
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

// props for our button
interface ButtonProps {
    color: string; // the color to use
    disabled?: boolean; // is it disabled?
    icon?: React.ReactNode; // optional icon component
}

// this is our basic button component
const Button : React.FC<ButtonProps> = props => {

    // expand props
    const { color, disabled, icon, children } = props;

    return <ButtonContainer color={disabled ? 'disabled' : color}>
        <span>
            { children }
        </span>

        {icon &&
            icon
        }
    </ButtonContainer>
}

export default Button;
