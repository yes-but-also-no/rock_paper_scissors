import type { Principal } from '@dfinity/principal';
export type Move = { 'scissors' : null } |
  { 'rock' : null } |
  { 'paper' : null };
export type Outcome = { 'tie' : null } |
  { 'win' : null } |
  { 'lose' : null };
export interface Result {
  'opponentPlayedAt' : bigint,
  'opponentMove' : Move,
  'opponentName' : string,
  'pointsEarned' : number,
  'outcome' : Outcome,
}
export interface _SERVICE {
  'getHighScoreByName' : (arg_0: string) => Promise<[] | [number]>,
  'getHighScores' : () => Promise<Array<[string, number]>>,
  'getLastPlayer' : () => Promise<[string, bigint]>,
  'playMove' : (arg_0: Move, arg_1: [] | [string]) => Promise<Result>,
}