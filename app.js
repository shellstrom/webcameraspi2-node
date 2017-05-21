var NodeWebcam = require( "node-webcam" );
var Twitter = require('twitter');
var smb2 = require('smb2');
var date;
var hours;

var opts = {
	width: 1280,
	height: 960,
	delay: 0,
	device: false,
	quality: 100,
	output: "jpeg",
	verbose: true,
	help: false,
	version: false,
	greyscale: false,
	rotation: false,
	topBanner: false,
	bottomBanner: false,
};

var client = new Twitter({
	consumer_key: 'TWITTER_CONSUMER_KEY',
	consumer_secret: 'TWITTER_CONSUMER_SECRET',
	access_token_key: 'TWITTER_ACCESS_TOKEN_KEY',
	access_token_secret: 'TWITTER_ACCESS_TOKEN_SECRET'
});

dateFunc();

/**
 * This is used to trigger image capturing, saving and conditional tweeting
 */
function dateFunc() {
	// You can pick out whatever parts you want from a date, or replace this with something else
	date = new Date().toISOString().replace(/:/g, '_').replace('T', ' ').substr(0, 19);
	// This will be used at a later point to determine if we want to tweet or not
	hours = date.split(' ')[1].substr(0,2);
	date = date.replace(' ', '_');
	opts.location = 'YOUR_LOCAL_TEMP_PATH_HERE! example: /var/www/images/temp.jpg';
	// Run sequence for capture, save and maybe tweet
	main();
}
// Set an interval of your choosing for when capturing, saving and conditional tweeting should occur
setInterval(dateFunc, 60 * 60 * 1000);

/**
 * This is the main logic for capturing images, saving them on internal and external storage, and
 * tweeting it to the world!
 */
function main() {
	//Location check
	if( ! opts.location ) {
		console.log( "\n\nNo file location specified. Please use with --l or --location FILE_NAME. QUITING" );
		return;
	}

	NodeWebcam.capture( opts.location, opts, function(err) {
		if (err) {
			console.error(err.stack);
			return;
		}
		console.log( "node-webcam capture success " + opts.location );
		
		var savedImage = require('fs').readFileSync(opts.location);
		require('fs').writeFileSync('SAMBA_PATH_HERE! example: /mnt/raid/images/'+date+'.jpg', savedImage);

		// If the hour on the watch is at the time we want to tweet, then we tweet it!
		if(hours === '10') {
			var data = require('fs').readFileSync(opts.location);

			// Make post request on media endpoint. Pass file data as media parameter
			client.post('media/upload', {media: data}, function(error, media, response) {

				if (!error) {

					// If successful, a media object will be returned.
					// console.log(media);

					// Let's tweet it
					var status = {
						status: 'Hello Twitters!',
						media_ids: media.media_id_string // Pass the media id string
					}

					client.post('statuses/update', status, function(error, tweet, response) {
						if (!error) {
							console.log('Tweet delivered!');
						}
					});
				}
			});
		}
	});
}
