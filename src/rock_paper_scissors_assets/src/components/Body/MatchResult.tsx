import React, {useMemo} from "react";
import {Move, Result} from "../../services/api";
import {Col, Grid, Row} from "react-flexbox-grid";
import {Spacer} from "../Helpers";
import {MoveName} from "./MoveObject";
import OutcomeObject from "./OutcomeObject";
import {useAppSelector} from "../../hooks";
import {selectPlayerName} from "../../store/playerInfo";
import Button from "../Controls/Button";
import Icon from "../Controls/Icon";
import Player from "../Player/Player";
import styled, {keyframes} from "styled-components";
import {bounceIn, bounceInLeft, bounceInRight, bounceInUp, flipInX} from 'react-animations';
import {OutcomeDefinitions} from "../../constants";
import {shallowEqualObjects} from "shallow-equal";

// entry animation for opponent
const opponentAnim = keyframes`${flipInX}`;

// entry animation for score and title text
const enterAnim = keyframes`${bounceIn}`;

// entry animation for back button
const enterAnimBottom = keyframes`${bounceInUp}`;

// entry anims for moves
const inLeftAnim = keyframes`${bounceInLeft}`;
const inRightAnim = keyframes`${bounceInRight}`;

// animated column
const AnimatedMoveLeftCol = styled(Col)`
  // entry anim
  animation: 1s ${inLeftAnim};

  // wait 1 s to start
  animation-delay: 1s;

  // don't revert
  animation-fill-mode: forwards;

  // hide at start
  transform: translateX(-3000px);
`;

// animated column
const AnimatedMoveRightCol = styled(Col)`
  // entry anim
  animation: 1s ${inRightAnim};

  // wait 1 s to start
  animation-delay: 1s;

  // don't revert
  animation-fill-mode: forwards;

  // hide at start
  transform: translateX(3000px);
`;

// animated column
const AnimatedOpponentCol = styled(Col)`
  // entry anim
  animation: 1s ${opponentAnim};
`;

// animated score col
const AnimatedScoreCol = styled(Col)<{ show: boolean }>`

  // entry anim
  animation: 1s ${enterAnim};

  // if there is no points, hide it
  ${props => props.show === "false" &&
          `animation: none !important;`
  } // hide default
  opacity: 0;

  // wait 1 s to start
  animation-delay: 3s;

  // don't revert
  animation-fill-mode: forwards;

`;

// back to home sticks to bottom
const BackToHomeContainer = styled.div`
  // fixed, finally
  position: fixed;

  // some space
  bottom: 10px;

  // big and wide
  width: 100vw;

  // center it
  left: 0;

  // max width
  div[class^="col-"] {
    // prevent hell on ultra-wides
    max-width: 768px;
  }

  // entry anim
  animation: 1s ${enterAnimBottom};

  // wait 1 s to start
  animation-delay: 3s;

  // don't revert
  animation-fill-mode: forwards;

  // hide at start
  transform: translateY(3000px);
`;

// result sticks to top
const ResultContainer = styled.div`
  // fixed, finally
  position: fixed;

  // some space
  top: 10px;

  // big and wide
  width: 100vw;

  // center it
  left: 0;

  // max width
  div[class^="col-"] {
    // prevent hell on ultra-wides
    max-width: 768px;
  }

  // entry anim
  animation: 1s ${enterAnim};

  // wait 1 s to start
  animation-delay: 2s;

  // don't revert
  animation-fill-mode: forwards;

  // start hidden
  opacity: 0;
`;

// The result text is a spin off of the logo
const ResultText = styled.div<{ color: string }>`

  // size font based on view height
  font-size: 8vh;

  // center align
  text-align: center;

  // cool, comic book yellow
  color: var(--color-${props => props.color});

  // logo font or sans
  font-family: 'Bangers', sans-serif;

  // this prevents the 'k' and 'r' from overlapping the commas
  letter-spacing: 4px;

  // outline effect
  -webkit-text-stroke: 2px black;

  // shadow effect
  text-shadow: 2px 4px 0 black;
`;

// this is the nice text for the move
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

    // expand result
    const {outcome} = result;

    // get player name
    const playerName = useAppSelector(selectPlayerName);

    // get the color and text for our outcome
    const [color, text] = useMemo(() => {

        // winner, winner, chicken dinner
        if (shallowEqualObjects(outcome, OutcomeDefinitions.Win))
            return ['green', 'you won!'];

        // worse than losing, somehow
        if (shallowEqualObjects(outcome, OutcomeDefinitions.Tie))
            return ['white', 'oof, you tied.'];

        // too bad
        if (shallowEqualObjects(outcome, OutcomeDefinitions.Lose))
            return ['red', 'too bad, you lost!'];

        // fallback
        return ['disabled', 'something went wrong. sorry about that'];

    }, [outcome])

    return <Grid fluid>

        <ResultContainer>
            <Row center='xs'>
                <Col xs={11} md={6}>
                    <ResultText color={color}>
                        {text}
                    </ResultText>
                </Col>
            </Row>
        </ResultContainer>

        <Row center='xs'>
            <AnimatedOpponentCol key='opponent' xs={11} md={9}>
                <Player playerName={result.opponentName}/>
            </AnimatedOpponentCol>
        </Row>

        <Spacer/>

        <Row center='xs'>
            <AnimatedMoveRightCol xs md={9} key='opponentMove'>
                <MoveText>
                    <MoveName move={result.opponentMove}/>
                </MoveText>
            </AnimatedMoveRightCol>
        </Row>

        <Spacer/>

        <Row center='xs'>
            <AnimatedScoreCol show={(result.pointsEarned > 0).toString()}>
                <OutcomeObject result={result}/>
            </AnimatedScoreCol>
        </Row>

        <Spacer/>

        <Row center='xs'>
            <AnimatedMoveLeftCol xs md={9} key='playerMove'>
                <MoveText>
                    <MoveName move={move}/>
                </MoveText>
            </AnimatedMoveLeftCol>
        </Row>

        <Spacer/>

        <Row center='xs'>
            <Col key='player' xs={11} md={9}>
                <Player playerName={playerName}/>
            </Col>
        </Row>

        <BackToHomeContainer>
            <Row center='xs'>
                <Col xs={11}>
                    <Button icon={<Icon color='black' icon='chevron-forward'/>} color='yellow' onClick={backToHome}>
                        back to <strong>home base</strong>
                    </Button>
                </Col>
            </Row>
        </BackToHomeContainer>

    </Grid>

};

export default MatchResult;
