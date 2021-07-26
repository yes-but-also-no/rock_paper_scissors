import Time "mo:base/Time";
import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Bool "mo:base/Bool";
import Prim "mo:prim";
import Debug "mo:base/Debug";
import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";
import Random "mo:base/Random";

actor RockPaperScissors {
    
    /*
        CONSTANTS
    */

    // Points awarded for a win against a player
    private let PointsForWinPlayer: Nat32 = 1000;

    // Points awarded for a tie (draw) against a player
    private let PointsForTiePlayer: Nat32 = 500;

    // Points awarded for a lose against a player
    private let PointsForLosePlayer: Nat32 = 0;

    // Points awarded for a win against a bot
    private let PointsForWinBot: Nat32 = 50;

    // Points awarded for a tie (draw) against a bot
    private let PointsForTieBot: Nat32 = 25;

    // Points awarded for a lose against a bot
    private let PointsForLoseBot: Nat32 = 0;

    // bot names
    private let BotNames : [Text] = [
        "Cpt Jack Sparrow [BOT]",
        "Li'l Sebastian [BOT]",
        "Peter Gregory [BOT]",
        "Elon Musk [BOT]",
        "Jeff Bezos [BOT]"
    ];

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

    // Earning - The amount of points the player is earning
    public type Earnings = {
        #full; // player vs player
        #bot; // player vs ai
        #zero; // anonymous player
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
        var earningType : Earnings = #full;

        // first, check and normalize name
        let playerName = normalizeAndValidateName(desiredName);

        // if they are anonymous, they get no points
        if (Text.equal(playerName, AnonName)) {
            earningType := #zero;
        }

        // if there is no new moves, they will play a bot and earn reduced moves
        else if (Text.equal(playerName, lastMove.playerName)) {
            earningType := #bot;
        };

        // create some vars for the result
        var pointsEarned : Nat32 = 0; // starts at nothing

        // find the move to check against
        var moveToCheck : Move = lastMove.move;

        // get the previous players name
        var previousPlayer : Text = lastMove.playerName;

        // if its a bot, get a random move and name
        if (earningType == #bot) {
            // get values
            let (a, b) = await getRandomMove();

            // assign
            moveToCheck := a;

            // and name
            previousPlayer := b;
        };

        // determine winner
        let outcome = switch (move, moveToCheck) {
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
        if (earningType == #full) {

            // update the amount of points earned
            // side note, I really like how we can use a switch here. Cool feature.
            pointsEarned := switch (outcome) {
                case (#win) PointsForWinPlayer;
                case (#tie) PointsForTiePlayer;
                case (#lose) PointsForLosePlayer;
            };

            // add score
            addScore(playerName, pointsEarned);
        } 

        // Extra condition - reduced earnings for bot play
        else if (earningType == #bot) {

            // update the amount of points earned
            pointsEarned := switch (outcome) {
                case (#win) PointsForWinBot;
                case (#tie) PointsForTieBot;
                case (#lose) PointsForLoseBot;
            };

            // add score
            addScore(playerName, pointsEarned);
        };

        // Prepare the result package
        let result = {
            outcome = outcome; // outcome of match
            pointsEarned = pointsEarned; // points earned
            opponentName = previousPlayer; // who we played against
            opponentMove = moveToCheck; // the last players move
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

    // this method gets a semi random move for a "bot" player
    // since this is just for fun, it doesn't have to be perfect
    // Returns move and name
    private func getRandomMove() : async (Move, Text) {
        // lets just use the time as a seed
        var seed : Blob = Blob.fromArray([Nat8.fromIntWrap(Time.now())]);

        // take a random byte
        var rand : Nat8 = Random.byteFrom(seed);

        // start at scissors
        var botMove : Move = #scissors;

        // test lower bounds
        if (rand < 85) {
            botMove := #rock;
        }

        // test next bounds
        else if (rand < 170) {
            botMove := #paper;
        };

        // now get name
        var botName : Text = BotNames[ Nat8.toNat(Nat8.div(rand, 51)) ];

        // return
        return (botMove, botName);
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
