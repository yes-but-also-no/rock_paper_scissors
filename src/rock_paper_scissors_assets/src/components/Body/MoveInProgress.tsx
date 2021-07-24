import React, {useCallback, useMemo} from "react";
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
interface MoveInProgressProps {
    move: Move; // the move we are currently submitting
}

// this is where you pick the move to make
const MoveInProgress: React.FC<MoveInProgressProps> = props => {

    // expand props
    const { move } = props;

    // create our move based on props
    const ourMove = useMemo(() => {
        switch (move) {
            case MoveDefinitions.Rock:
                return <Button color='red'>
                    <strong>rock</strong>, the power move
                </Button>;

            case MoveDefinitions.Paper:
                return <Button color='yellow'>
                    <strong>paper</strong>, the safe bet
                </Button>;

            case MoveDefinitions.Scissors:
                return <Button color='purple'>
                    <strong>scissors</strong>, the wildcard
                </Button>;
        }
    }, [move]);

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
                {ourMove}
            </Col>
        </Row>

    </Grid>

};

export default MoveInProgress;
