import React, {useCallback, useMemo} from "react";
import {useAppDispatch} from "../../hooks";
import {setPlayerToInspect} from "../../store/gameState";
import {Col, Row} from "react-flexbox-grid";
import RankIndicator from "../HighScores/RankIndicator";
import {AnonymousName} from "../../constants";
import Note from "../Controls/Note";
import styled from "styled-components";

// this is a rounded note, used for player names
export const RoundedNote = styled(Note).attrs({isButton: true})`
  // smoooooth
  border-radius: 10px;

  // less padding
  padding: 5px 15px;
`;

// props for single player
interface PlayerProps {
    playerName: string; // the players name
}

// this is a single player represented as an object
const Player: React.FC<PlayerProps> = props => {

    // expand props
    const {playerName} = props;

    // check if anonymous
    const isAnonymous = useMemo(() =>
        playerName === AnonymousName
        , [playerName]);

    // hook dispatch
    const dispatch = useAppDispatch();

    // method to inspect this player
    const inspect = useCallback(() =>
            dispatch(
                setPlayerToInspect(playerName)
            )
        , [dispatch, playerName]);

    return (
        <RoundedNote onClick={!isAnonymous && inspect} color='white'>
            <Row center='xs' middle='xs'>
                {!isAnonymous &&
                <Col>
                    <RankIndicator playerName={playerName}/>
                </Col>
                }

                <Col xs>
                    <strong>{playerName}</strong>
                </Col>
            </Row>
        </RoundedNote>
    );
}

export default Player;
