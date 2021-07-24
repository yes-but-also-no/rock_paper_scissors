import React, {useCallback} from 'react';
import styled from "styled-components";
import Note from "../Controls/Note";
import {useAppDispatch} from "../../hooks";
import {setHighScoresOpen} from "../../store/gameState";

// style to handle image
const HighScoresNote = styled(Note)`

  // less padding, more i c o n
  padding: 10px 15px;

  // to center the icon
  display: flex;

  // center it
  align-items: center;

  //align-self: stretch;
  margin-bottom: 10px;

  // control the size
  img {
    height: 1.5rem;
  }
`

// this is the button that launches our high scores view
const HighScoresButton: React.FC = () => {

    // hook dispatch
    const dispatch = useAppDispatch();

    // click method
    const onClick = useCallback(() =>
        dispatch(
            setHighScoresOpen(true)
        )
    , [dispatch]);

    return <HighScoresNote onClick={onClick} color='white'>
        <img src='imgs/icons/hs.svg' alt='high scores'/>
    </HighScoresNote>

};

export default HighScoresButton;
