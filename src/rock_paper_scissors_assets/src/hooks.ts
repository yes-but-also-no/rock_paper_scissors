import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import type {AppDispatch, RootState} from './store'
import {selectAllHighScores} from "./store/highScores";
import {useMemo} from "react";

// These spare us having to type the full types out every time
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// get a players ranking by name
// will be 1 based, or zero for unranked
export const usePlayerRanking = (playerName: string): number => {

    // get all high scores
    const allHighScores = useAppSelector(selectAllHighScores);

    // memoize
    return useMemo(() => {

        // start at unranked
        let rank = 0;

        // loop all
        for (let i = 0; i < allHighScores.length; i++) {
            // loop up name
            const [pName] = allHighScores[i];

            // check name
            if (pName !== playerName)
                continue;

            // ladies and gentlemen, we got him

            // add one to give us one based
            rank = (i + 1);

            // save some computing power. You're welcome.
            break;
        }

        // done
        return rank;
    }, [allHighScores, playerName]);
}
