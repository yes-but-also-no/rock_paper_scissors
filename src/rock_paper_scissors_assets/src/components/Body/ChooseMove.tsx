import React, {useCallback} from "react";
import {useAppSelector} from "../../hooks";
import {selectPlayerName} from "../../store/playerInfo";
import {useMutation} from "react-query";
import {Move, submitMove} from "../../services/api";
import {Col, Grid, Row} from "react-flexbox-grid";
import Note from "../Controls/Note";
import {Spacer} from "../Helpers";
import Button from "../Controls/Button";
import {MoveDefinitions} from "../../constants";

// props def
interface ChooseMoveProps {
    playMove(move: Move): void; // the actual move function
}

// this is where you pick the move to make
const ChooseMove: React.FC<ChooseMoveProps> = props => {

    // expand props
    const { playMove } = props;

    return <Grid fluid>

        <Row center='xs'>
            <Col xs={12} md={9}>
                <Note color='white'>
                    let&apos;s score some points.

                    <br/>

                    <strong>choose a move to play</strong>
                </Note>
            </Col>
        </Row>

        <Spacer />
        <Spacer />

        <Row center='xs'>
            <Col xs={11} md={9}>
                <Button color='red' onClick={() => playMove(MoveDefinitions.Rock)}>
                    <strong>rock</strong>, the power move
                </Button>
            </Col>
        </Row>

        <Spacer />

        <Row center='xs'>
            <Col xs={11} md={9}>
                <Button color='yellow' onClick={() => playMove(MoveDefinitions.Paper)}>
                    <strong>paper</strong>, the safe bet
                </Button>
            </Col>
        </Row>

        <Spacer />

        <Row center='xs'>
            <Col xs={11} md={9}>
                <Button color='purple' onClick={() => playMove(MoveDefinitions.Scissors)}>
                    <strong>scissors</strong>, the wildcard
                </Button>
            </Col>
        </Row>

    </Grid>

};

export default ChooseMove;
