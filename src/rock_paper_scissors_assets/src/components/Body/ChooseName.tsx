import React, {useCallback, useMemo, useState} from "react";
import {Col, Grid, Row} from "react-flexbox-grid";
import Button from "../Controls/Button";
import Note from "../Controls/Note";
import Input from "../Controls/Input";
import {AnonymousName, NameMaxLength, NameMinLength} from "../../constants";
import {useAppDispatch} from "../../hooks";
import {setPlayerName} from "../../store/playerInfo";
import styled from "styled-components";

// this is the styled row for this section that has some nice spacing
const Spacer = styled.div`
  // he fills space 
  height: 20px;
`

// this is the name select screen, the first screen a player sees if they have no name saved
const ChooseName: React.FC = () => {

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
        setInvalid(nameLength < NameMinLength && nameLength !== 0);

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

    // button handler
    // only differes from on submit in that an invalid name just gives us anonymous
    const onPlayClick = useCallback(() => {
        // get the name
        const nameToSave = (name.length < NameMinLength || name.length > NameMaxLength)
            ? AnonymousName
            : name.toUpperCase();

        // set it
        dispatch(
            setPlayerName(nameToSave)
        );

    }, [dispatch, name]);

    // easter egg
    const isBeingCheeky = useMemo(() =>
        name.toUpperCase() === AnonymousName
        , [name]);

    return <Grid fluid>

        <Row center='xs'>
            <Col xs={11} md={9}>
                <Button color='yellow' onClick={onPlayClick}>
                    play as <strong>{(name === '' || invalid) ? AnonymousName : name}</strong>
                </Button>
            </Col>
        </Row>

        <Spacer/>
        <Spacer/>

        {invalid &&
        <Row center='xs'>
            <Col>
                <Note color='red'>
                    name must be between <strong>{NameMinLength} and {NameMaxLength}</strong> characters long
                </Note>
            </Col>
        </Row>
        }

        {!invalid && !isBeingCheeky &&
        <Row center='xs'>
            <Col>
                <Note color='white'>
                    or choose a name to <strong>save your high score...</strong>
                </Note>
            </Col>
        </Row>
        }

        {!invalid && isBeingCheeky &&
        <Row center='xs'>
            <Col>
                <Note color='white'>
                    that&apos;s the same as entering <strong>nothing</strong>...
                </Note>
            </Col>
        </Row>
        }

        <Spacer/>

        <Row center='xs'>
            <Col xs={12} md={9}>
                <Input invalid={invalid} onChange={onChange} value={name} onSubmit={onSubmit}/>
            </Col>
        </Row>
    </Grid>

};

export default ChooseName;
