import React from 'react';
import {useAppSelector} from "../../hooks";
import {selectAllHighScores} from "../../store/highScores";
import {Col, Grid, Row} from "react-flexbox-grid";
import {RankIndicatorBasic} from "./RankIndicator";
import styled from "styled-components";

// special no padding grid for high scores
const HighScoresGrid = styled(Grid)`

  // grid has a little tho
  padding: 5px 13px;

  // no column padding
  div[class^="col-"] {
    padding: 0;
  }
`;

// props for single entry
interface HighScoreEntryProps {
    playerName: string; // the players name
    rank: number; // the players rank
    score: number; // the players score
}

// this is a single high score entry
const HighScoreEntry: React.FC<HighScoreEntryProps> = props => {

    // expand props
    const {playerName, rank, score} = props;

    return <Row center='xs' middle='xs'>
        <Col xs={3}>
            <RankIndicatorBasic rank={rank}/>
        </Col>

        <Col xs={6}>
            {playerName}
        </Col>

        <Col xs={3}>
            {score}
        </Col>
    </Row>;
}

// this shows all players rankings
const HighScoresList: React.FC = () => {

    // get all high scores
    const allHighScores = useAppSelector(selectAllHighScores);

    return <HighScoresGrid>
        {allHighScores.map(([playerName, score], index) =>
            <HighScoreEntry playerName={playerName} score={score} rank={index + 1} key={playerName}/>
        )}
    </HighScoresGrid>;

};

export default HighScoresList;
