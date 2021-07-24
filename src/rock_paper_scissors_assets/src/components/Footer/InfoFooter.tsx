import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import styled from "styled-components";

// this is a footer column with text styling
const FooterCol = styled(Col)`
  // don't want to brag or anything
  font-size: smaller;
  
  // center align best align
  text-align: center;
  
  // space to breathe
  padding-bottom: 10px;

  // cool, comic book white
  color: white;

  // logo font or sans
  font-family: 'Bangers', sans-serif;

  // outline effect
  -webkit-text-stroke: 1px black;
  
  // make the images pretty
  img {
    // short guy
    height: 30px;
    
    // social distancing
    margin-left: 10px;
  }
`;

// these guys only exist to take up space
const FillerCol = styled(Col).attrs({xs: true})`
  // we dont want the filler columns to have any size, so as to not mess us up in small screens
  padding: 0;
`;

// this is the footer info for dev name and other info
const InfoFooter : React.FC = () =>
    <Grid fluid>
        <Row center='xs' middle='xs'>
            <FillerCol />

            <FooterCol>
                Created by
            </FooterCol>

            <FooterCol>
                <img src='imgs/cheems.png' alt='me' />
            </FooterCol>

            <FillerCol />

            <FooterCol>
                Powered by
            </FooterCol>

            <FooterCol>
                <img src='imgs/dfinity.png' alt='me' />
            </FooterCol>

            <FillerCol />
        </Row>
    </Grid>;

export default InfoFooter;
