import {rock_paper_scissors} from "../../../declarations/rock_paper_scissors";
import {Move, Outcome, Result} from "../../../declarations/rock_paper_scissors/rock_paper_scissors.did";
import {QueryClient} from "react-query";
import {HighScores, sortHighScores} from "../store/highScores";

// Create queryClient
export const queryClient = new QueryClient();

// params for submit move
export interface SubmitMoveParams {
    move: Move, // the move to make
    playerName?: string // optional player name
}

// submits a move to the canister
export const submitMove = (moveParams: SubmitMoveParams): Promise<Result> =>
    rock_paper_scissors.playMove(moveParams.move, [moveParams.playerName]);

// pulls the high scores and transforms the data
// managed by query client
export const fetchHighScores = async (): Promise<HighScores> => {

    // make the call, bogdanoff!
    const result = await rock_paper_scissors.getHighScores();

    // sort and hand back
    return sortHighScores(result);
}

// pulls a single players score
// managed by query client
export const fetchPlayerHighScore = async (playerName: string): Promise<number> => {

    // hit up the insane clown posse
    const [score] = await rock_paper_scissors.getHighScoreByName(playerName);

    return score || 0;
}

export {Move, Result, Outcome};
