import React from "react";
import {Move} from "../../services/api";
import {Col, Grid, Row} from "react-flexbox-grid";
import Note from "../Controls/Note";
import {Spacer} from "../Helpers";
import {MoveDefinitions} from "../../constants";
import MoveObject from "./MoveObject";

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

        <Row center='xs'>
            <Col xs={11} md={9}>
                <MoveObject move={MoveDefinitions.Rock} onClick={() => playMove(MoveDefinitions.Rock)} />
            </Col>
        </Row>

        <Row center='xs'>
            <Col xs={11} md={9}>
                <MoveObject move={MoveDefinitions.Paper} onClick={() => playMove(MoveDefinitions.Paper)} />
            </Col>
        </Row>

        <Row center='xs'>
            <Col xs={11} md={9}>
                <MoveObject move={MoveDefinitions.Scissors} onClick={() => playMove(MoveDefinitions.Scissors)} />
            </Col>
        </Row>

    </Grid>

};

export default ChooseMove;
