import React, {useMemo} from 'react';
import Note from "../Controls/Note";
import {usePlayerRanking} from "../../hooks";
import styled from "styled-components";

// custom rank indicator with less padding
const RankNote = styled(Note)`
  // less padding
  padding: 5px;

  // to center the icon
  display: flex;

  // center it
  align-items: center;

  // center it again
  justify-content: center;

  // text center
  text-align: center;
`;

// rank indicator basic props
interface RankIndicatorBasicProps {
    rank: number; // numerical ranking
}

// no looup rank indicator, for use in high scores list
export const RankIndicatorBasic: React.FC<RankIndicatorBasicProps> = props => {

    // expand props
    const {rank} = props;

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

    return <RankNote color={color}>
        <strong>{rank}{textThingy}</strong>
    </RankNote>
}

// rank indicator props
interface RankIndicatorProps {
    playerName: string; // the player whos rank to show
}

// this shows a players rank indicator
const RankIndicator: React.FC<RankIndicatorProps> = props => {

    // expand props
    const {playerName} = props;

    // try and get our rank
    const rank = usePlayerRanking(playerName);

    // add to base
    return <RankIndicatorBasic rank={rank}/>

};

export default RankIndicator;
