import React, {useCallback} from "react";
import {Col, Grid, Row} from "react-flexbox-grid";
import Note from "../Controls/Note";
import {Spacer} from "../Helpers";
import Button from "../Controls/Button";
import {useMutation} from "react-query";
import {Move, submitMove} from "../../services/api";
import {MoveDefinitions} from "../../constants";
import {useAppSelector} from "../../hooks";
import {selectPlayerName} from "../../store/playerInfo";

// this is the main gameplay screen
const GamePlay: React.FC = () => {

    // find our name
    const playerName = useAppSelector(selectPlayerName);

    // mutation to submit move
    const mutation = useMutation(submitMove, {
        onSuccess: data => console.log(data)
    });

    // callback for button press
    const playMove = useCallback((move: Move) =>
        mutation.mutate({move, playerName})
    , [mutation, playerName]);

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

export default GamePlay;
