import React from 'react';
import styled from "styled-components";

// this is the style note, to look like a narrator box
const Note = styled.div<{color: string}>`
  // pick a theme color
  background-color: var(--color-${props => props.color});
  
  // padding makes it look good
  padding: 15px;
  
  // text color contrasts
  color: var(--color-${props => props.color}-contrast);
  
  // cool border right?
  border: 2px solid black;

  // cool shadow right?
  box-shadow: var(--standard-shadow);
  
  // a slightly less annoying font
  font-family: 'Montserrat', sans-serif;
  
  // in a slightly less annoying weight
  font-weight: 400;
`;

export default Note;
