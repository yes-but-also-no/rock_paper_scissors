import React from "react";
import {Col, Grid, Row} from "react-flexbox-grid";
import Note from "../Controls/Note";

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

    </Grid>

};

export default GamePlay;
