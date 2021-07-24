import React from "react";
import styled, {keyframes} from "styled-components";
import {tada} from 'react-animations';

// entry animation for the logo
const logoAnim = keyframes`${tada}`;

// The logo contains styling and text for the logo
const Logo = styled.div`

  // size font based on view height
  font-size: 8vh;

  // give us some space on top
  padding: 2vh 20px 0;

  // center align
  text-align: center;

  // cool, comic book yellow
  color: var(--color-yellow);

  // logo font or sans
  font-family: logo-font, sans-serif;

  // this prevents the 'k' and 'r' from overlapping the commas
  letter-spacing: 4px;

  // outline effect
  -webkit-text-stroke: 2px black;

  // shadow effect
  text-shadow: 2px 4px 0 black;

  // entry anim
  animation: 1s ${logoAnim};

  // name of the game
  &:after {
    content: 'Block, Paper, Scissors!'
  }
`;

export default Logo;

