import React, {useCallback} from 'react';
import {Col, Grid, Row} from 'react-flexbox-grid';
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectPlayerIsAnonymous, selectPlayerName, setPlayerName} from "../../store/playerInfo";
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

    // hook dispatch
    const dispatch = useAppDispatch();

    // find our name
    const playerName = useAppSelector(selectPlayerName);

    // find out if we are anon
    const isAnonymous = useAppSelector(selectPlayerIsAnonymous);

    // if we are anon, clicking on the footer will let us pick a name
    // otherwise, it will show us our stats
    const nameClick = useCallback(() => {

        // clear our name if anon
        if (isAnonymous)
            dispatch(
                setPlayerName('')
            );

        // otherwise, inspect our player
        else
            console.log('clicked name');
    }, [dispatch, isAnonymous]);

    return <Grid fluid>
        <Row center='xs'>
            {!isAnonymous &&
            <FooterCol>
                <RankIndicator/>
            </FooterCol>
            }

            <FooterCol xs md={9}>
                <Note onClick={nameClick} color='white'>
                    <strong>{playerName}</strong>
                </Note>
            </FooterCol>


            <HighScoresButton/>

        </Row>
    </Grid>

};

export default GameFooter;
