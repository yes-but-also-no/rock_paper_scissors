import React from "react";
import {Col, Grid, Row} from "react-flexbox-grid";
import Note from "../Controls/Note";
import {Spacer} from "../Helpers";
import Button from "../Controls/Button";

// this is the main gameplay screen
const GamePlay: React.FC = () => {

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
                <Button color='red'>
                    <strong>rock</strong>, the power move
                </Button>
            </Col>
        </Row>

        <Spacer />

        <Row center='xs'>
            <Col xs={11} md={9}>
                <Button color='yellow'>
                    <strong>paper</strong>, the safe bet
                </Button>
            </Col>
        </Row>

        <Spacer />

        <Row center='xs'>
            <Col xs={11} md={9}>
                <Button color='purple'>
                    <strong>scissors</strong>, the wildcard
                </Button>
            </Col>
        </Row>

    </Grid>

};

export default GamePlay;
