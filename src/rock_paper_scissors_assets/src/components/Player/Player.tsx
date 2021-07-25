import React, {useMemo} from "react";
import {Col, Row} from "react-flexbox-grid";
import RankIndicator from "../HighScores/RankIndicator";
import {AnonymousName} from "../../constants";
import Note from "../Controls/Note";
import styled from "styled-components";

// this is a rounded note, used for player names
export const RoundedNote = styled(Note)<{ extraPadding: boolean }>`
  // smoooooth
  border-radius: 10px;

  // less padding
  ${props => !props.extraPadding &&
          `padding: 5px 15px;`
  }
`;

// this is the "loading" player while waiting for our move to complete
export const PlayerLoading: React.FC = () => {

    return (
        <RoundedNote extraPadding={true} color='disabled'>
            <Row center='xs' middle='xs'>
                <Col xs>
                    <div className='ld ld-ring ld-spin'/>
                </Col>
            </Row>
        </RoundedNote>
    );
}

// props for single player
interface PlayerProps {
    playerName: string; // the players name
    onClick?(): void; // when happens when we click?
}

// this is a single player represented as an object
const Player: React.FC<PlayerProps> = props => {

    // expand props
    const {playerName, onClick} = props;

    // check if anonymous
    const isAnonymous = useMemo(() =>
        playerName === AnonymousName
        , [playerName]);

    return (
        <RoundedNote isButton={onClick !== undefined} extraPadding={isAnonymous} onClick={onClick} color='white'>
            <Row center='xs' middle='xs'>
                {!isAnonymous &&
                <Col>
                    <RankIndicator playerName={playerName}/>
                </Col>
                }

                <Col xs>
                    <strong>{playerName}</strong>
                </Col>
            </Row>
        </RoundedNote>
    );
}

export default Player;
