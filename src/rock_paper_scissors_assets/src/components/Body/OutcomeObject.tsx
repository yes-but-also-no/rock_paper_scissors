import React, {useMemo} from "react";
import {Result} from "../../services/api";
import {AnonymousName, OutcomeDefinitions} from "../../constants";
import {shallowEqualObjects} from "shallow-equal";
import Note from "../Controls/Note";
import {useAppSelector} from "../../hooks";
import {selectPlayerName} from "../../store/playerInfo";

// props def
interface OutcomeObjectProps {
    result: Result; // the result of our matchup
}

// this component has the outcome of the match
const OutcomeObject: React.FC<OutcomeObjectProps> = props => {

    // expand props
    const { result } = props;

    // expand result
    const { outcome, opponentName } = result;

    // find our name
    const playerName = useAppSelector(selectPlayerName);

    // check for self play
    const playedSelf = useMemo(() =>
        playerName !== AnonymousName && playerName === opponentName
    , [opponentName, playerName]);

    // get the color and text for our outcome
    const [color, text, textBold] = useMemo(() => {

        // winner, winner, chicken dinner
        if (shallowEqualObjects(outcome, OutcomeDefinitions.Win))
            return ['green', 'you ', 'won!'];

        // worse than losing, somehow
        if (shallowEqualObjects(outcome, OutcomeDefinitions.Tie))
            return ['white', 'oof, you ', 'tied.'];

        // too bad
        if (shallowEqualObjects(outcome, OutcomeDefinitions.Lose))
            return ['red', 'too bad, you ', 'lost!'];

        // fallback
        return ['disabled', 'something went wrong', 'sorry about that'];

    }, [outcome])

    // special case for playing yourself
    if (playedSelf)
        return <Note color='white'>
            congratulations, you <strong>played yourself.</strong>

            <br/>
            <br/>

            also, you <strong>{textBold}</strong> Nice.
        </Note>;

    // normal outcome
    return <Note color='white'>
        {text}<strong>{textBold}</strong>
    </Note>;

};

export default OutcomeObject;
