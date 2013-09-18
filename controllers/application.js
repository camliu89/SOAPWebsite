var ACS = require('acs').ACS;

function index(req, res) {
	res.render('index');
}

function error (req, res) {
    res.render('error');
}