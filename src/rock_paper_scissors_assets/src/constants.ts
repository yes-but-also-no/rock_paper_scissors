// max lengths for player name
export const NameMaxLength = 10;
export const NameMinLength = 2;

// anonymous name
export const AnonymousName = 'ANONYMOUS';

// moves
export const MoveDefinitions = {
    Rock: {rock: null},
    Paper: {paper: null},
    Scissors: {scissors: null},
}

// outcomes
export const OutcomeDefinitions = {
    Win: {win: null},
    Tie: {tie: null},
    Lose: {lose: null},
}

// high score fetch interval
export const HighScoreFetchInterval = 10 * 60 * 1000; // every 10 minutes

// query keys
export const HighScoresQueryKey = 'highScores';
