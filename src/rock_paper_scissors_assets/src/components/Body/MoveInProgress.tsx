import React from "react";
import {Col, Grid, Row} from "react-flexbox-grid";
import Note from "../Controls/Note";
import {Spacer} from "../Helpers";
import {useAppSelector} from "../../hooks";
import {selectPlayerName} from "../../store/playerInfo";
import Player, {PlayerLoading} from "../Player/Player";
import styled, {keyframes} from "styled-components";
import {bounceIn, bounceInLeft, bounceInRight} from 'react-animations';

// entry animations
const inLeftAnim = keyframes`${bounceInLeft}`;
const inRightAnim = keyframes`${bounceInRight}`;
const inAnim = keyframes`${bounceIn}`;

// animated column
const AnimatedLeftCol = styled(Col)`
  // entry anim
  animation: 1s ${inLeftAnim};
`;

// animated column
const AnimatedRightCol = styled(Col)`
  // entry anim
  animation: 1s ${inRightAnim};

  // wait 1 s to start
  animation-delay: 1.5s;

  // don't revert
  animation-fill-mode: forwards;

  // hide at start
  transform: translateX(3000px);
`;

// animated vs column
const AnimatedCenterCol = styled(Col)`
  // entry anim
  animation: 1s ${inAnim};

  // wait 1 s to start
  animation-delay: 0.9s;

  // don't revert
  animation-fill-mode: forwards;

  // hide at start
  opacity: 0;
`;

// copy paste from result, to keep spacing
const MoveText = styled.span`
  // don't want to brag or anything
  font-size: xx-large;

  // center align best align
  text-align: center;

  // cool, comic book white
  color: white;

  // logo font or sans
  font-family: 'Bangers', sans-serif;

  // outline effect
  -webkit-text-stroke: 1px black;

  // hidden
  opacity: 0;
`;

// this is where you pick the move to make
const MoveInProgress: React.FC = () => {

    // find our name
    const playerName = useAppSelector(selectPlayerName);

    return <Grid fluid>

        <Row center='xs'>
            <AnimatedRightCol key='opponent' xs={11} md={9}>
                <PlayerLoading/>
            </AnimatedRightCol>
        </Row>

        <Spacer/>

        <Row center='xs'>
            <Col xs md={9} key='opponentMove'>
                <MoveText>
                    hidden
                </MoveText>
            </Col>
        </Row>

        <Spacer/>

        <Row center='xs'>
            <AnimatedCenterCol>
                <Note color='white'>
                    <strong>VS</strong>
                </Note>
            </AnimatedCenterCol>
        </Row>

        <Spacer/>

        <Row center='xs'>
            <Col xs md={9} key='playerMove'>
                <MoveText>
                    hidden
                </MoveText>
            </Col>
        </Row>

        <Spacer/>

        <Row center='xs'>
            <AnimatedLeftCol key='player' xs={11} md={9}>
                <Player playerName={playerName}/>
            </AnimatedLeftCol>
        </Row>

    </Grid>

};

export default MoveInProgress;
