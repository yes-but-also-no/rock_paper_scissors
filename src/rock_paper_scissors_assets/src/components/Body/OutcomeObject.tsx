import React from "react";
import {Result} from "../../services/api";
import Note from "../Controls/Note";
import {useAppSelector, usePlayerRanking} from "../../hooks";
import {selectPlayerName} from "../../store/playerInfo";

// props def
interface OutcomeObjectProps {
    result: Result; // the result of our matchup
}

// this component has the outcome of the match
const OutcomeObject: React.FC<OutcomeObjectProps> = props => {

    // expand props
    const {result} = props;

    // expand result
    const {pointsEarned} = result;

    // find our name
    const playerName = useAppSelector(selectPlayerName);

    // get our points
    const [, points] = usePlayerRanking(playerName);

    // normal outcome
    return <Note color='white'>
        <strong>{points}</strong>
    </Note>;

};

export default OutcomeObject;
