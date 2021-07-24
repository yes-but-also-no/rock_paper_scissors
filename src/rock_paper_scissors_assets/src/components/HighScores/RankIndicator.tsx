import React, {useMemo} from 'react';
import Note from "../Controls/Note";
import {useAppSelector, usePlayerRanking} from "../../hooks";
import {selectPlayerName} from "../../store/playerInfo";

// this shows a players rank indicator
const RankIndicator: React.FC = () => {

    // find our name
    const playerName = useAppSelector(selectPlayerName);

    // try and get our rank
    const rank = usePlayerRanking(playerName);

    // get our text.. thing. what is this even called?
    const [textThingy, color] = useMemo(() => {

        // check rank
        switch (rank) {
            case (1):
                return ['st', 'gold'];

            case (2):
                return ['nd', 'silver'];

            case (3):
                return ['rd', 'bronze'];

            default:
                return ['th', 'white'];
        }
    }, [rank]);

    // check for unranked
    if (rank === 0)
        return null;

    return <Note color={color}>
        <strong>{rank}{textThingy}</strong>
    </Note>

};

export default RankIndicator;
