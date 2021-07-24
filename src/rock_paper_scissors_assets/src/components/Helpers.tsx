import {Col} from "react-flexbox-grid";
import styled from "styled-components";

// these guys only exist to take up space
export const FillerCol = styled(Col).attrs({xs: true})`
  // we dont want the filler columns to have any size, so as to not mess us up in small screens
  padding: 0;
`;

// this is a div to take up vertical space
export const Spacer = styled.div`
  // he fills space 
  height: 20px;
`
