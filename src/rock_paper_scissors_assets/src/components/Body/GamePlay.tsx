import React, {useCallback} from "react";
import {useMutation} from "react-query";
import {Move, submitMove} from "../../services/api";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectPlayerName} from "../../store/playerInfo";
import {setInMatch} from "../../store/gameState";
import ChooseMove from "./ChooseMove";
import MoveInProgress from "./MoveInProgress";
import MatchResult from "./MatchResult";

// this is the main gameplay screen
const GamePlay: React.FC = () => {

    // find our name
    const playerName = useAppSelector(selectPlayerName);

    // hook dispatch
    const dispatch = useAppDispatch();

    // mutation to submit move
    const mutation = useMutation(submitMove, {
        onMutate: () => dispatch(setInMatch(true))
    });

    // callback for button press
    const playMove = useCallback((move: Move) =>
            mutation.mutate({move, playerName})
        , [mutation, playerName]);

    // callback to leave to home
    const backToHome = useCallback(() => {
        // clear mutation state
        mutation.reset();

        // clear flag
        dispatch(setInMatch(false));
    }, [dispatch, mutation]);

    // if we are submitting a move, show the progress screen
    if (mutation.isLoading)
        return <MoveInProgress move={mutation.variables.move}/>

    // if we got a result
    if (mutation.isSuccess)
        return <MatchResult backToHome={backToHome} move={mutation.variables.move} result={mutation.data}/>

    // allow the player to choose
    return <ChooseMove playMove={playMove} />

};

export default GamePlay;
