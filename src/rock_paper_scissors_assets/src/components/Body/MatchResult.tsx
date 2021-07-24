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
            <Col xs md={9}>
                <Note color='white'>
                    <strong>{result.opponentName}</strong>
                </Note>
            </Col>
        </Row>

        <Spacer />

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

        <Spacer/>
        <Spacer/>

        <Row center='xs'>
            <Col xs={11} md={9}>
                <MoveObject move={move}/>
            </Col>
        </Row>

        <Spacer/>

        <Row center='xs'>
            <Col xs md={9}>
                <Note color='white'>
                    <strong>{playerName}</strong>
                </Note>
            </Col>
        </Row>

        <Spacer/>
        <Spacer/>
        <Spacer/>

        <Row center='xs'>
            <Col xs={11} md={9}>
                <Button color='yellow' onClick={backToHome}>
                    back to <strong>home base</strong>
                </Button>
            </Col>
        </Row>

    </Grid>

};

export default MatchResult;
