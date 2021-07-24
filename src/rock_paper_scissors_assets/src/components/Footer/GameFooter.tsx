import React from 'react';
import {Col, Grid, Row} from 'react-flexbox-grid';
import styled from "styled-components";
import {useAppSelector} from "../../hooks";
import {selectPlayerIsAnonymous, selectPlayerName} from "../../store/playerInfo";
import Note from "../Controls/Note";
import HighScoresButton from "../HighScores/HighScoresButton";
import RankIndicator from "../HighScores/RankIndicator";

// this is a footer column with text styling
const FooterCol = styled(Col)`
  
  // center align best align
  text-align: center;
  
  // space to breathe
  padding-bottom: 10px;
  
`;

// this is the footer with player info
const GameFooter : React.FC = () => {

    // find our name
    const playerName = useAppSelector(selectPlayerName);

    // find out if we are anon
    const isAnonymous = useAppSelector(selectPlayerIsAnonymous);

    return <Grid fluid>
        <Row center='xs'>
            {!isAnonymous &&
            <FooterCol>
                <RankIndicator/>
            </FooterCol>
            }

            <FooterCol xs md={9}>
                <Note color='white'>
                    <strong>{playerName}</strong>
                </Note>
            </FooterCol>


            <HighScoresButton/>

        </Row>
    </Grid>

};

export default GameFooter;
