module.exports = function (app, friends) {
    app.get("/api/friends", function(req, res){
        res.json(friends);
    })

    app.post("/api/friends", function(req, res){
        
        // Take in new friend and convert the scores from strings to intergers
        var newFriend = req.body;

        newFriend.score.forEach(function(value, i, array){
            array[i]  = parseInt(value);
        })
        
        // Set variables for best friend and a countdown for best score
        // (Scores closer to 0 indicate higher compatability)
        var bestFriend = "";
        var bestCompat = 100;


        // Loop through friends array and run compatability test
        for (i in friends) {

            let compat = 0;

            for (let j = 0; j < 10; j++) {
                compat += Math.abs(newFriend.score[j] - friends[i].score[j]);

            }
            if (compat <= bestCompat) {
                bestCompat = compat;
                bestFriend = friends[i];
            }
        }
        friends.push(newFriend);
        res.json(bestFriend);
    });
}