module.exports = function (app, friends) {
    app.get("/api/friends", function(req, res){
        res.json(friends);
    })

    app.post("/api/friends", function(req, res){
        
        // Take in new friend and convert the scores from strings to intergers
        var newFriend = req.body;
        newFriend.scores.forEach(function(value, i, array){
            array[i]  = parseInt(value);
        })
        
        // Set variables for best friend and a countdown for best score
        // (Scores closer to 0 indicate higher compatability)
        var bestFriend = "";
        var bestCompat = 100;

        // Loop through friends array and run compatability test
        for (i in friends) {
            let compat = 0;

            for (let x = 0; x < 10; x++) {
                compat += Math.abs(newFriend.scores[x] - friends[i].scores[x]);
            }

            if (compat <= bestCompat) {
                bestCompat = compat;
                bestFriend = friends[i];
            }

        }

        friends.push(newFriend);
        res.JSON(bestFriend);
    });
}