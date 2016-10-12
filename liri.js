var inquirer = require('inquirer');
var userChoice = process.argv[2];
var userInput = process.argv.slice(3,process.argv.length).join(' ');

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
	function callUserChoice(userChoice, userInput) {
switch (userChoice) {
	case 'my-tweets':
		getTwitterTweets();
		break;
	case "spotify-this-song":
		getSpotifySong(userInput);
		break;
	case "movie-this":
		getMovies(userInput);
		break;
	case "do-what-it-says":
		doAsItSays();
		break;
	default:
		text = "Please select correct answer"
	}
};

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

		for (var i = 0; i < tweets.length; i++) {
			var date = moment(tweets[i].created_at).format('MM/DD/YYYY');
			console.log('date: ' + date + ' tweet: ' + tweets[i].text);
		}
	});
}


function getSpotifySong(userInput) {

	var spotify = require('spotify');

	spotify.search({
		type: 'track',
		query: userInput || '"The Sign"',
		limit: 1
	}, function(err, data) {
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		}

		for (var i = 0; i < data.tracks.items.length; i++) {
			console.log('\n*********************   Tracks   ************************\n')
			console.log('Artist Name:', data.tracks.items[i].artists[0].name)
			console.log('Song Name:', data.tracks.items[i].name)
			console.log('Preview Link:', data.tracks.items[i].external_urls.spotify)
			console.log('Album Name:', data.tracks.items[i].album.name);
		}


	});

}

function getMovies(userInput) {

	var request = require('request');

	userInput = userInput || 'forrest gump';

	request('http://www.omdbapi.com/?t=' + userInput + '&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var data = JSON.parse(body);

	  	console.log('\n*********************   Movie Details   ************************\n');
	  	console.log('Title:', data.Title);
	  	console.log('Release Year:', data.Year);
	  	console.log('IMDB Rating:', data.imdbRating);
	  	console.log('Country:', data.Country);
	  	console.log('Language:', data.Language);
	  	console.log('Plot:', data.Plot);
	  	console.log('Actors:', data.Actors);
	  	console.log('Rotten Tomatoes Rating:', data.tomatoRating);
	  	console.log('Rotten Tomatoes Rating:', data.tomatoURL);
	  }
	})
}


function doAsItSays () {

	var fs = require('fs');

		// fs.writeFile('random.txt', 'I Want it That Way', (err) => {
		// 	if(err) throw err;
		// 	console.log('Saved');
		// 	return;
		// })

		fs.readFile('random.txt', {encoding: 'utf8'}, (err, data) => {
			if(err) throw err;
			console.log(data);
			var textInput = data.split(',');

			callUserChoice( textInput[0], textInput[1] );

		})

// 		for(var i=3; i<process.argv.length; i++) {

// 		fs.appendFile('random.txt\n', process.argv[i] , (err, data) => {
// 			if(err) throw err;
// 			console.log(data);
// 			if(data === 'inception') {
// 				getMovies();
// 			}
// 		})
// }

}

callUserChoice( userChoice, userInput);
