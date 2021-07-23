import React from "react";
import styled from "styled-components";

// The logo contains styling and text for the logo
const Logo = styled.div`

  // size font based on view height
  font-size: 8vh;
  
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
  
  // shaddow effect
  text-shadow: 2px 4px 0 black;
  
  &:after {
    content: 'Block, Paper, Scissors!'
  }
`;

export default Logo;

