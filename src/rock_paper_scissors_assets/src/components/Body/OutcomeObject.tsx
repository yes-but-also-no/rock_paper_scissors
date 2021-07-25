import React from "react";
import {Result} from "../../services/api";
import Note from "../Controls/Note";
import CountUp from 'react-countup';
import styled from "styled-components";

// styled text
const PointsText = styled.strong`
  // green for MONEY
  color: var(--color-green);
`;

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

    // normal outcome
    return <Note color='white'>
        <PointsText>
            <CountUp prefix='+ ' end={pointsEarned} delay={3.7} separator=',' suffix=' points'/>
        </PointsText>
    </Note>;

};

export default OutcomeObject;
