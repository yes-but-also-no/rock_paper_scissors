import React, {useCallback, useState} from "react";
import {Col, Grid, Row} from "react-flexbox-grid";
import Button from "../Controls/Button";
import Note from "../Controls/Note";
import Input from "../Controls/Input";
import {NameMaxLength, NameMinLength} from "../../constants";
import {useAppDispatch} from "../../hooks";
import {setPlayerName} from "../../store/playerInfo";

// this is the name select screen, the first screen a player sees if they have no name saved
const ChooseName : React.FC = () => {

    // hook dispatch
    const dispatch = useAppDispatch();

    // find out if we have a name or not
    const [name, setName] = useState('');

    // track valid state
    const [invalid, setInvalid] = useState(false);

    // type handler
    const onChange = useCallback(e => {

        // get length
        const nameLength = e.target.value.length;

        // check length
        if (nameLength > NameMaxLength)
            return;

        // update
        setName(e.target.value);

        // set invalid
        setInvalid(nameLength < NameMinLength);

    }, []);

    // submit handler
    const onSubmit = useCallback(() => {
        // validate one more time
        if (name.length < NameMinLength || name.length > NameMaxLength)
            return;

        // set it
        dispatch(
            setPlayerName(name.toUpperCase())
        );

    }, [dispatch, name]);

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
                <Input invalid={invalid} onChange={onChange} value={name} onSubmit={onSubmit} />
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
