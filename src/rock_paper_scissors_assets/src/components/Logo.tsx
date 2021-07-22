import React from "react";
import styled from "styled-components";

// The logo container has styling for our logo
const LogoContainer = styled.div`
  
  // font
  font-family: game-font-bold, sans-serif;
  
  // backup for fallback font
  font-weight: bold;
  
  // sizing
  font-size: 2em;
  
  // center
  text-align: center;
  
  // color
  color: var(--color-orange);
  
  // outline
  -webkit-text-stroke: 2px black;
  
`;

// actual logo component
const Logo: React.FC = () =>
    <LogoContainer>
        Block, Paper,
        <br />
        Scissors!
    </LogoContainer>

export default Logo;
