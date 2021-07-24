import React, {useCallback} from "react";
import {useMutation} from "react-query";
import {Move, submitMove} from "../../services/api";
import {useAppSelector} from "../../hooks";
import {selectPlayerName} from "../../store/playerInfo";
import ChooseMove from "./ChooseMove";
import MoveInProgress from "./MoveInProgress";

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

    // if we are submitting a move, show the progress screen
    if (mutation.isLoading)
        return <MoveInProgress move={mutation.variables.move} />

    // allow the player to choose
    return <ChooseMove playMove={playMove} />

};

export default GamePlay;
