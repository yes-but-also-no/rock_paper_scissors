import { rock_paper_scissors } from "../../../declarations/rock_paper_scissors";
import { Move, Result } from "../../../declarations/rock_paper_scissors/rock_paper_scissors.did";
import {QueryClient} from "react-query";

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

export {Move, Result};
