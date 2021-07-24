import React, {useMemo} from "react";
import {Move} from "../../services/api";
import {Col, Grid, Row} from "react-flexbox-grid";
import {Spacer} from "../Helpers";
import {Result} from "../../services/api";
import MoveObject from "./MoveObject";
import OutcomeObject from "./OutcomeObject";

// props def
interface MatchResultProps {
    move: Move; // the move we submitted
    result: Result; // the match result
}

// this is where we get the outcome of the match
const MatchResult: React.FC<MatchResultProps> = props => {

    // expand props
    const { move, result } = props;

    return <Grid fluid>

        <Row center='xs'>
            <Col xs={11} md={9}>
                <MoveObject move={result.opponentMove} />
            </Col>
        </Row>

        <Spacer />
        <Spacer />

        <Row center='xs'>
            <Col>
                <OutcomeObject result={result} />
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

export default MatchResult;
