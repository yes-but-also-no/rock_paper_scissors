import React from "react";
import {Move} from "../../services/api";
import {Col, Grid, Row} from "react-flexbox-grid";
import Note from "../Controls/Note";
import {Spacer} from "../Helpers";
import Button from "../Controls/Button";
import MoveObject from "./MoveObject";

// props def
interface MoveInProgressProps {
    move: Move; // the move we are currently submitting
}

// this is where you pick the move to make
const MoveInProgress: React.FC<MoveInProgressProps> = props => {

    // expand props
    const { move } = props;

    return <Grid fluid>

        <Row center='xs'>
            <Col xs={11} md={9}>
                <Button color='disabled'>
                    <div className='ld ld-ring ld-spin' />
                </Button>
            </Col>
        </Row>

        <Spacer />
        <Spacer />

        <Row center='xs'>
            <Col>
                <Note color='white'>
                    <strong>VS</strong>
                </Note>
            </Col>
        </Row>

        <Spacer />
        <Spacer />

        <Row center='xs'>
            <Col xs={11} md={9}>
                <MoveObject move={move} />
            </Col>
        </Row>

    </Grid>

};

export default MoveInProgress;
