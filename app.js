var ACS = require('acs').ACS;
var ACS_KEY = 'YOUR ACS KEY';
var ACS_SECRET = 'YOUR ACS SECRET KEY';

// initialize app
function start(app, express) {
	app.use(express.favicon(__dirname + '/public/images/favicon.ico'));		//set favicon
	
	app.use(express.session({ key: 'node.acs', secret: ACS_SECRET }));

    ACS.init(ACS_KEY, ACS_SECRET);
}

// release resources
function stop() {
	
}