import Time "mo:base/Time";
import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Bool "mo:base/Bool";
import Prim "mo:prim";
import Debug "mo:base/Debug";

actor RockPaperScissors {
    
    /*
        CONSTANTS
    */

    // Points awarded for a win
    private let PointsForWin: Nat32 = 1000;

    // Points awarded for a tie (draw)
    private let PointsForTie: Nat32 = 500;

    // Points awarded for a lose
    private let PointsForLose: Nat32 = 0;

    // Min name length
    private let MinNameLength: Int = 2;

    // Max name length
    private let MaxNameLength: Int = 10;

    // Static "Anonymous" name - this name never earns points
    private let AnonName: Text = "ANONYMOUS";

    /*
        TYPES
    */

    // Move - The move a player can make
    public type Move = {
        #rock;
        #paper;
        #scissors;
    };

    // Outcome - The win / loss / tie of a play
    public type Outcome = {
        #win;
        #tie;
        #lose;
    };

    // Result - The result of a play, and the amount of points won or lost
    public type Result = {
        outcome: Outcome; // Outcome of play
        opponentName: Text; // The user played against
        opponentMove: Move; // The opponent's move
        opponentPlayedAt: Int; // When the opponent submitted his move
        pointsEarned: Nat32; // Points won (+1000 for win, +500 for tie, +0 for lose, or played self, or no name)
    };

    // Last Move - The last play that was made in this game
    private type LastMove = {
        move : Move; // The move that was made
        playerName : Text; // The player name that made this move
        playedAt : Int; // The time this move was made
    };

    /*
        STATE
    */

    // The last play that was made
    private stable var lastMove : LastMove = {
        move = #rock;
        playerName = "DOGEDEV";
        playedAt = Time.now();
    };

    // High scores backup, this is used for upgrades to cannister
    private stable var _highScores : [(Text, Nat32)] = [];

    // High scores, name mapped against score
    private let highScores = Map.fromIter<Text, Nat32>(
        _highScores.vals(),
        1, Text.equal, Text.hash);

    /*
        PUBLIC API
    */

    // Gets the last players name and time, but does not reveal the move they made
    public query func getLastPlayer() : async (playerName: Text, playedAt: Int) {
        (lastMove.playerName, lastMove.playedAt)
    };

    // Gets all the high scores
    public query func getHighScores() : async ([(Text, Nat32)]) {
        return Iter.toArray(highScores.entries());
    };

    // Gets a single players high score, if it exists
    public query func getHighScoreByName(playerName: Text) : async (?Nat32) {
        highScores.get(playerName);
    };

    // The bread and butter - submit a move to see if you won, and become the next move
    public func playMove(move: Move, desiredName: ?Text) : async (Result) {

        // this var determines if the player earns points with this move
        var isEarningPoints = true;

        // first, check and normalize name
        let playerName = normalizeAndValidateName(desiredName);

        // if they are anonymous or using a name and if they are playing themselves, they get no points
        if (Text.equal(playerName, AnonName) or Text.equal(playerName, lastMove.playerName)) {
            isEarningPoints := false;
        };

        // create some vars for the result
        var pointsEarned : Nat32 = 0; // starts at nothing

        // determine winner
        let outcome = switch (move, lastMove.move) {
            // ties
            case (#rock, #rock) #tie;
            case (#paper, #paper) #tie;
            case (#scissors, #scissors) #tie;
            
            // wins
            case (#rock, #scissors) #win;
            case (#paper, #rock) #win;
            case (#scissors, #paper) #win;

            // loses
            case (#rock, #paper) #lose;
            case (#paper, #scissors) #lose;
            case (#scissors, #rock) #lose;
        };

        // Update points, if they have earned any
        // Technically we could skip this call if its a tie, as it adds no points
        // But I want to see a new player with a tie still end up on the board
        if (isEarningPoints) {

            // update the amount of points earned
            // side note, I really like how we can use a switch here. Cool feature.
            pointsEarned := switch (outcome) {
                case (#win) PointsForWin;
                case (#tie) PointsForTie;
                case (#lose) PointsForLose;
            };

            // add score
            addScore(playerName, pointsEarned);
        };

        // Prepare the result package
        let result = {
            outcome = outcome; // outcome of match
            pointsEarned = pointsEarned; // points earned
            opponentName = lastMove.playerName; // who we played against
            opponentMove = lastMove.move; // the last players move
            opponentPlayedAt = lastMove.playedAt; // the timestamp of the last move
        };

        // Update the last move
        lastMove := {
            move = move;
            playerName = playerName;
            playedAt = Time.now();
        };

        // return the result package
        return result;
    };

    /* 
        HELPER METHODS
    */

    // This method will perform some basic checks to make sure the users name is valid
    // It will normalize and return a valid name
    // Any invalid names will just register as anonymous
    private func normalizeAndValidateName(desiredName: ?Text) : (Text) {
        // make sure a name was even provided
        switch (desiredName) {
            // no name, they are playing as anon
            case (null) { return AnonName; };

            // real name, continue to validate
            case (?playerName) {
                // name must be longer that min name and shorter than max name
        
                // get name length
                let len = playerName.size();

                // validate length
                if (len < MinNameLength or len > MaxNameLength) {
                    // invalid length becomes anonymous
                    return AnonName;
                };

                // normalize name to all caps
                return Text.translate(playerName, func (c: Char) {
                    // prim has a method to convert char to upper, but must also be converted back to Text
                    Text.fromChar(Prim.charToUpper(c));
                });
            };
        }
    };

    // This method adds points to a players high score
    // It is assumed the name has been validated first
    private func addScore(playerName: Text, points: Nat32) {

        // ensure we are never adding score to anonymous account
        assert(Text.notEqual(playerName, AnonName));

        // Check if they have a score yet or not
        switch (highScores.get(playerName)) {
            // No entry yet, start their score
            case null {
                highScores.put(playerName, points);
            };

            // They have a score already, add to it
            case (?oldScore) {
                // generate new score
                let newScore = oldScore + points;

                // validate it is not negative or above max
                assert(newScore >= 0 and newScore <= 4294967295);

                // add to scores
                highScores.put(playerName, newScore);
            };
        }
    };

    /*
        SYSTEM METHODS
    */

    // back up our high scores before an upgrade
    system func preupgrade() {
        _highScores := Iter.toArray(highScores.entries());
    };

    // clear after upgrade
    system func postupgrade() {
        _highScores := [];
    }
};
