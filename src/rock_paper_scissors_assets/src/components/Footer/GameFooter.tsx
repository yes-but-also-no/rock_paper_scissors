import React, {useCallback} from 'react';
import {Col, Grid, Row} from 'react-flexbox-grid';
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectPlayerIsAnonymous, selectPlayerName, setPlayerName} from "../../store/playerInfo";
import Note from "../Controls/Note";
import HighScoresButton from "../HighScores/HighScoresButton";
import Player from "../Player/Player";
import {setPlayerToInspect} from "../../store/gameState";

// this is a footer row with styling
const FooterRow = styled(Row)`

  // center align best align
  text-align: center;

  // space to breathe
  padding-bottom: 10px;

`;

// this is a rounded note, copied from player.tsx. shame on me.
export const RoundedNote = styled(Note).attrs({isButton: true})`
  // smoooooth
  border-radius: 10px;
`;

// this is the footer with player info
const GameFooter: React.FC = () => {

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
            dispatch(
                setPlayerToInspect(playerName)
            );
    }, [dispatch, isAnonymous, playerName]);

    return <Grid fluid>
        <FooterRow center='xs' around='md'>
            <Col xs md={10}>
                <Player onClick={nameClick} playerName={playerName}/>
            </Col>

            <HighScoresButton/>

        </FooterRow>
    </Grid>

};

export default GameFooter;
