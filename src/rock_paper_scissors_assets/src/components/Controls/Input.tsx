import React, {useCallback} from 'react';
import {Col, Grid, Row} from "react-flexbox-grid";
import styled from "styled-components";

// this is the style for our text input
const InputObject = styled.input<{invalid: boolean}>`
  // white duh
  background-color: white;
  
  // padding makes it look good
  padding: 15px;
  
  // text color contrasts
  color: black;
  
  // cool shadow right?
  box-shadow: var(--standard-shadow);
  
  // border
  border: 2px solid var(--color-${props => props.invalid ? 'red' : 'black'});
  
  // a slightly less annoying font
  font-family: 'Montserrat', sans-serif;
  
  // in a slightly less annoying weight
  font-weight: 400;
  
  // ALWAYS UPPER CASE
  text-transform: uppercase;
`;

// this is the icon for the input
const InputIcon = styled.div<{invalid: boolean}>`
  // white duh
  background-color: var(--color-${props => props.invalid ? 'red' : 'green'});

  // padding makes it look good
  padding: 10px;

  // text color contrasts
  color: white;

  // border
  border: 2px solid var(--color-${props => props.invalid ? 'red' : 'black'});
  
  // but hide the right so its not too T H I C C
  border-right: none;
  
  // cool shadow right?
  box-shadow: var(--standard-shadow);
  
  // control the size
  img {
    height: 1.5rem;
  }
`;

// this is the row for the input
const InputRow = styled.form`
  // make it all same height
  align-items: stretch;
  
  // flex on them
  display: flex;

  // inputs also need space to breathe
  margin: 5px;
  
  // handle the icon
  ${InputIcon} {
    // to center the icon
    display: flex;
    
    // center it
    align-items: center;
  }
  
  // handle the input
  ${InputObject} {
    // he should fill
    flex: 1;
  }
`

// props for our input
interface InputProps {
    invalid: boolean; // is the text invalid
    onChange(e: React.ChangeEvent<HTMLInputElement>): void, // change event
    value: string; // the text to populate
    onSubmit(): void; // if they hit enter
    placeholder?: string; // placeholder text
}

// this is our basic button component
const Input: React.FC<InputProps> = props => {

    // expand props
    const { invalid, onChange, onSubmit, value, placeholder } = props;

    // submit handler
    const onSubmitHandler = useCallback(e => {
        // dont refresh the page bro
        e.preventDefault();

        // call the event
        onSubmit();
    }, [onSubmit]);

    return (
        <InputRow onSubmit={onSubmitHandler}>

            <InputIcon invalid={invalid}>
                <img src='imgs/icons/pencil.svg' alt='pencil' />
            </InputIcon>


            <InputObject value={value} placeholder={placeholder} onChange={onChange} invalid={invalid} type='text' />
        </InputRow>
    );
}

export default Input;
