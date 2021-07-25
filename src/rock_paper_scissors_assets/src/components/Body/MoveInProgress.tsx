import React from "react";
import {Move} from "../../services/api";
import {Col, Grid, Row} from "react-flexbox-grid";
import Note from "../Controls/Note";
import {Spacer} from "../Helpers";
import Button from "../Controls/Button";
import {useAppSelector} from "../../hooks";
import {selectPlayerName} from "../../store/playerInfo";
import Player from "../Player/Player";

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
            <Col xs={11} md={9}>
                <Button color='disabled'>
                    <div className='ld ld-ring ld-spin'/>
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
                <Player playerName={playerName}/>
            </Col>
        </Row>

    </Grid>

};

export default MoveInProgress;
