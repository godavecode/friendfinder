var friendsData = require("../data/friends.js");
var path = require("path");
var bodyParser = require("body-parser");

module.exports = function(app) {
    app.get('/api/friends', function(req, res) {
        res.json(friendsData);
    })

    app.post('/api/friends', function(req, res) {
        var addFriend = req.body;
        var pointDiff = 50;
        var match;
        friendsData.forEach(function(apiFriends) {
            var difference = 0;
            for (var i = 0; i < apiFriends.scores.length; i++) {
                difference += Math.abs(apiFriends.scores[i] - addFriend.scores[i]);
            }
            if (difference <= pointDiff) {
                pointDiff = difference;
                match = apiFriends;
            }
        })
        res.json(match);
        friendsData.push(addFriend);
    })
}