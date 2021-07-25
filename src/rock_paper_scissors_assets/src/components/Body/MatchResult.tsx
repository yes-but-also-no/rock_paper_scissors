import React from "react";
import {Move, Result} from "../../services/api";
import {Col, Grid, Row} from "react-flexbox-grid";
import {Spacer} from "../Helpers";
import MoveObject from "./MoveObject";
import OutcomeObject from "./OutcomeObject";
import Note from "../Controls/Note";
import {useAppSelector} from "../../hooks";
import {selectPlayerName} from "../../store/playerInfo";
import Button from "../Controls/Button";
import Icon from "../Controls/Icon";
import Player from "../Player/Player";
import styled, {keyframes} from "styled-components";
import {flipInX} from 'react-animations';

// entry animation for opponent
const opponentAnim = keyframes`${flipInX}`;

// animated column
const AnimatedOpponentCol = styled(Col)`
  // entry anim
  animation: 1s ${opponentAnim};
`;

// back to home sticks to bottom
const BackToHomeContainer = styled.div`
  // fixed, finally
  position: fixed;
  
  // some space
  bottom: 10px;
  
  // not QUITE full
  width: 100vw;
  
  // center it
  left: 0;
`;

// props def
interface MatchResultProps {
    move: Move; // the move we submitted
    result: Result; // the match result
    backToHome(): void; // to navigate back to home
}

// this is where we get the outcome of the match
const MatchResult: React.FC<MatchResultProps> = props => {

    // expand props
    const {move, result, backToHome} = props;

    // get player name
    const playerName = useAppSelector(selectPlayerName);

    return <Grid fluid>

        <Row center='xs'>
            <AnimatedOpponentCol key='opponent' xs md={9}>
                <Player playerName={result.opponentName}/>
            </AnimatedOpponentCol>
        </Row>

        <Spacer />
        <Spacer />

        <Row center='xs'>
            <Col>
                <OutcomeObject result={result} />
            </Col>
        </Row>

        <Spacer/>
        <Spacer/>

        <Row center='xs'>
            <Col key='player' xs md={9}>
                <Player playerName={playerName}/>
            </Col>
        </Row>

        <BackToHomeContainer>
            <Row center='xs'>
                <Col xs={11} md={6}>
                    <Button icon={<Icon color='black' icon='chevron-forward' />} color='yellow' onClick={backToHome}>
                        back to <strong>home base</strong>
                    </Button>
                </Col>
            </Row>
        </BackToHomeContainer>

    </Grid>

};

export default MatchResult;
