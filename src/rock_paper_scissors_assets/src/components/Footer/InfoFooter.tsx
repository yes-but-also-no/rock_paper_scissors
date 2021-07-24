import React from 'react';
import {Col, Grid, Row} from 'react-flexbox-grid';
import styled from "styled-components";
import {FillerCol} from "../Helpers";

// this is a footer column with text styling
const FooterCol = styled(Col)`
  // don't want to brag or anything
  font-size: medium;
  
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
