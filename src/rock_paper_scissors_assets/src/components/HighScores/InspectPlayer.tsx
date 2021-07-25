import React, {useCallback} from 'react';
import {useAppDispatch, useAppSelector, usePlayerRanking} from "../../hooks";
import {updatePlayerHighScore} from "../../store/highScores";
import {Col, Grid, Row} from "react-flexbox-grid";
import {RankIndicatorBasic} from "./RankIndicator";
import styled from "styled-components";
import {Spacer} from "../Helpers";
import {useQuery} from "react-query";
import {HighScoresQueryKey} from "../../constants";
import {fetchPlayerHighScore} from "../../services/api";
import {selectPlayerToInspect, setPlayerToInspect} from "../../store/gameState";
import Modal from "../Modal/Modal";
import {selectPlayerName, setPlayerName} from "../../store/playerInfo";
import Button from "../Controls/Button";

// customize the grid
// we will do some flexbox here because the inspect player content is kinda small
// looks better to center it
const InspectPlayerGrid = styled(Grid)`

  // more flex in this project than muscle beach
  display: flex;

  // column is the superior choice
  flex-direction: column;

  // center our content
  justify-content: center;

  // fill that note up
  height: 100%;
`;

// this shows all players rankings
const InspectPlayer: React.FC = () => {

    // hook dispatch
    const dispatch = useAppDispatch();

    // find the player we are inspecting
    const playerName = useAppSelector(selectPlayerToInspect);

    // find the player that WE are playing as
    const localPlayerName = useAppSelector(selectPlayerName);

    // get the players score
    const [rank, score] = usePlayerRanking(playerName);

    // query for latest data
    useQuery(
        [HighScoresQueryKey, playerName],
        () => fetchPlayerHighScore(playerName),
        {
            enabled: playerName !== '',
            onSuccess: data =>
                dispatch(updatePlayerHighScore({playerName, score: data}))
        }
    );

    // method to close inspect player
    const closeInspectPlayer = useCallback(() =>
            dispatch(
                setPlayerToInspect('')
            )
        , [dispatch]);

    // method to change name
    const changeName = useCallback(() =>
            dispatch(
                setPlayerName('')
            )
        , [dispatch]);

    return <Modal
        extraButton={
            localPlayerName === playerName &&
            <Button onClick={changeName} color='yellow'>
                log out
            </Button>
        }
        close={closeInspectPlayer}
        title={playerName}
        height={50}
        color='blue'
    >
        <InspectPlayerGrid fluid>
            <Row center='xs' middle='xs'>
                <Col xs={6} md={4}>
                    <strong>rank:</strong>
                </Col>

                <Col xs={6} md={4}>
                    {rank === 0 &&
                    <>unranked</>
                    }

                    {rank !== 0 &&
                    <RankIndicatorBasic rank={rank}/>
                    }
                </Col>
            </Row>

            <Spacer/>

            <Row center='xs' middle='xs'>
                <Col xs={6} md={4}>
                    <strong>score:</strong>
                </Col>

                <Col xs={6} md={4}>
                    {score}
                </Col>
            </Row>
        </InspectPlayerGrid>
    </Modal>;

};

export default InspectPlayer;
