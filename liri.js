var inquirer = require('inquirer');
var userChoice = process.argv[2];
var userInput = process.argv[3];

// inquirer.prompt([

// 	{
// 		type: 'list',
// 		name: 'userChoice',
// 		message: 'Please select one of the following options',
// 		choices: [
// 				'my-tweets',
// 				'spotify-this-song',
// 				'movie-this',
// 				'do-what-it-says'
// 			]
// 			// validate: function(answer) {
// 			// 	if(answer === "my-tweets") {
// 			// 		return true;
// 			// 	}
// 			// 	return 'Not valid';
// 			// }
// 	}

// ]).then(function(answer) {
	// switch (answer.userChoice) {
	switch (userChoice) {
		case 'my-tweets':
			getTwitterTweets();
			break;
		case "spotify-this-song":
			getSpotifySong();
			break;
		case "movie-this":
			break;
		case "do-what-it-says":
			break;
		default:
			text = "Please select correct answer"
	}
// });

function getTwitterTweets() {

	var keys = require('./keys.js');
	var twitterKey = keys.twitterKeys;
	var Twitter = require('twitter');
	var moment = require('moment');

	var client = new Twitter({
		consumer_key: twitterKey.consumer_key,
		consumer_secret: twitterKey.consumer_secret,
		access_token_key: twitterKey.access_token_key,
		access_token_secret: twitterKey.access_token_secret
	});

	var params = {
		screen_name: 'nishthaarora',
		count: 20
	}

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (error) {
			console.log(error);
		}

		for(var i=0; i<tweets.length; i++) {
			var date = moment(tweets[i].created_at).format('MM/DD/YYYY');
			console.log('date: ' + date +' tweet: ' + tweets[i].text);
		}
	});
}


function getSpotifySong () {

	var spotify = require('spotify');
	// var song = [];

	// 	for(var i=3; i<process.argv.length; i++) {
	// 		song.push(process.argv[i]);
	// }

	// var songString = song.join('');

spotify.search({ type: 'track', query: userInput || 'dancing in the moonlight' }, function(err, data) {
	console.log(data);
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    // Do something with 'data'
});

}


