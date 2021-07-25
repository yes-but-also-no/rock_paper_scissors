import React from 'react';
import styled from "styled-components";

// this is the style for our button
const ButtonContainer = styled.div<{color: string}>`
  // pick a theme color
  background-color: var(--color-${props => props.color});
  
  // padding makes it look good
  padding: 15px;
  
  // space to breathe
  margin: 5px 0;
  
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
  
  // flex it up
  display: flex;
  
  // and make it look pretty
  align-items: center;
  
  // hover effect
  @media (hover: hover) {
    &:hover {
      transform: skewX(-15deg) scale(1.1);
    }
  }
  
  // tap effect
  &:active {
    transform: skewX(-15deg) scale(0.9);
  }
  
  // smooth effects
  transition: transform 200ms ease;
  
  // make sure the label isn't all tilt-y
  span {
    display: inline-block;
    
    // undo tilt
    transform: skewX(15deg);
    
    // room to grow
    flex: 1;
  }
`;

// props for our button
interface ButtonProps {
    color: string; // the color to use
    disabled?: boolean; // is it disabled?
    icon?: React.ReactNode; // optional icon component
    onClick?(): void; // click event
}

// this is our basic button component
const Button : React.FC<ButtonProps> = props => {

    // expand props
    const {color, disabled, icon, children, onClick} = props;

    return <ButtonContainer onClick={onClick} color={disabled ? 'disabled' : color}>
        <span>
            {children}
        </span>

        {icon &&
        icon
        }
    </ButtonContainer>
}

export default Button;
