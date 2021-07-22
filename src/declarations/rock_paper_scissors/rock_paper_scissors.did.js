export const idlFactory = ({ IDL }) => {
  const Move = IDL.Variant({
    'scissors' : IDL.Null,
    'rock' : IDL.Null,
    'paper' : IDL.Null,
  });
  const Outcome = IDL.Variant({
    'tie' : IDL.Null,
    'win' : IDL.Null,
    'lose' : IDL.Null,
  });
  const Result = IDL.Record({
    'opponentPlayedAt' : IDL.Int,
    'opponentMove' : Move,
    'opponentName' : IDL.Text,
    'pointsEarned' : IDL.Nat32,
    'outcome' : Outcome,
  });
  return IDL.Service({
    'getHighScoreByName' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Nat32)],
        ['query'],
      ),
    'getHighScores' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat32))],
        ['query'],
      ),
    'getLastPlayer' : IDL.Func([], [IDL.Text, IDL.Int], ['query']),
    'playMove' : IDL.Func([Move, IDL.Opt(IDL.Text)], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };