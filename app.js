var ACS = require('acs').ACS;
var ACS_KEY = 'azmQYfjKPdSdVNqjfgen5FuKknvoRPGA';
var ACS_SECRET = 'HjwGkNbUgFjadLPLj7sUf13FG3qIYcsI';

// initialize app
function start(app, express) {
	app.use(express.favicon(__dirname + '/public/images/favicon.ico'));		//set favicon
	
	app.use(express.session({ key: 'node.acs', secret: ACS_SECRET }));

    ACS.init(ACS_KEY, ACS_SECRET);
}

// release resources
function stop() {
	
}