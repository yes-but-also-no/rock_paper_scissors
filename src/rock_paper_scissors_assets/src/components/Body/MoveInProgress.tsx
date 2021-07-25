import React from "react";
import {Move} from "../../services/api";
import {Col, Grid, Row} from "react-flexbox-grid";
import Note from "../Controls/Note";
import {Spacer} from "../Helpers";
import {useAppSelector} from "../../hooks";
import {selectPlayerName} from "../../store/playerInfo";
import Player, {PlayerLoading} from "../Player/Player";
import styled, {keyframes} from "styled-components";
import {bounceIn, bounceInLeft, bounceInRight} from 'react-animations';

// entry animation for the logo
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

// props def
interface MoveInProgressProps {
    move: Move; // the move we are currently submitting
}

// this is where you pick the move to make
const MoveInProgress: React.FC<MoveInProgressProps> = props => {

    // expand props
    const {move} = props;

    // find our name
    const playerName = useAppSelector(selectPlayerName);

    return <Grid fluid>

        <Row center='xs'>
            <AnimatedRightCol key='opponent' xs={11} md={9}>
                <PlayerLoading/>
            </AnimatedRightCol>
        </Row>

        <Spacer />
        <Spacer />

        <Row center='xs'>
            <AnimatedCenterCol>
                <Note color='white'>
                    <strong>VS</strong>
                </Note>
            </AnimatedCenterCol>
        </Row>

        <Spacer />
        <Spacer />

        <Row center='xs'>
            <AnimatedLeftCol key='player' xs={11} md={9}>
                <Player playerName={playerName}/>
            </AnimatedLeftCol>
        </Row>

    </Grid>

};

export default MoveInProgress;
