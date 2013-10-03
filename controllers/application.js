var ACS = require('acs').ACS;

function index(req, res) {
	if(!req.session.session_id) {
    	res.render('index', {
        loginCorrect: false
      });
  	} else {
    	res.redirect('/adults');
  	}	
}

function error (req, res) {
    if(!req.session.session_id) {
    	res.render('error');
  	} else {
    	res.redirect('/adults');
  	}	
}

function register (req, res) {
	res.render ('register', {
    hasError: false
  });
}