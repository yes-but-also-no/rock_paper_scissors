import React from "react";
import {useAppSelector} from "../../hooks";
import {selectHasPickedName} from "../../store/playerInfo";
import {Col, Grid, Row} from "react-flexbox-grid";
import Button from "../Controls/Button";
import styled from "styled-components";
import Note from "../Controls/Note";
import Input from "../Controls/Input";

// body container gives us some nice spacing
const BodyContainer = styled.div`
  
`;

// this is the name select screen, the first screen a player sees if they have no name saved
const ChooseName : React.FC = () => {

    // find out if we have a name or not
    const hasPickedName = useAppSelector(selectHasPickedName);

    return <Grid fluid>
        <Row start='xs'>
            <Col>
                <Note color='white'>
                    choose a name to <strong>save your high score...</strong>
                </Note>
            </Col>
        </Row>

        <Row start='xs'>
            <Col>
                <Input />
            </Col>
        </Row>

        <Row start='xs'>
            <Col>
                <Note color='white'>
                    choose a name to <strong>save your high score...</strong>
                </Note>
            </Col>
        </Row>

        <Row center='xs'>
            <Col xs={11}>
                <Button color='yellow'>
                    Hello world!
                </Button>
            </Col>
        </Row>
    </Grid>

};

export default ChooseName;
