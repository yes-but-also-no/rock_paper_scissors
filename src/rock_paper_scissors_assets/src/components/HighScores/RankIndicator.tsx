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
    const textThingy = useMemo(() => {

        // check rank
        switch (rank) {
            case (1):
                return 'st';

            case (2):
                return 'nd';

            case (3):
                return 'rd';

            default:
                return 'th';
        }
    }, [rank]);

    // check for unranked
    if (rank === 0)
        return null;

    return <Note color='white'>
        <strong>{rank}{textThingy}</strong>
    </Note>

};

export default RankIndicator;
