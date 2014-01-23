var ACS = require('acs-node');

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

function checkPoint (req, res) {

    res.render ('checkpoint', {
      data: null,
      cases: [],
      name: req.session.firstName,
      role: req.session.role
    });
  
  
}

function submitCheck (req, res) {

  ACS.Users.query({
       where: {
        email: req.body.email
      }
    }, 
    function(userData) {
      if (userData.success) {

        if (userData.users.length == 1) {

          var caseIds = userData.users[0].custom_fields.casesDone;
          var userName = userData.users[0].first_name + " " + userData.users[0].last_name;

          ACS.Objects.query({
            classname: 'soap',
            order: 'created_at' 
          }, 
          function (caseData) {
              if (caseData.success) {

                  var casesDone = [];
                  for (var i = 0; i < caseIds.length; i++) {
                    for (var j = 0; j < caseData.soap.length; j++) {
                      if (caseIds[i] === caseData.soap[j].id) {
                        caseData.soap[j].done = true;
                        break;
                      }
                    }
                  }
                  res.render('checkpoint', {
                    data: userName,
                    cases: caseData.soap,
                    name: req.session.firstName,
                    role: req.session.role
                  });
              } else {
                  console.log(caseData.error);
              }
          }, req, res);
        }

        else {
          res.render('checkpoint', {
            data: "NO USERNAME FOUND",
            cases: [],
            name: req.session.firstName,
            role: req.session.role
           });
        }
        

      }
        else {
        console.log(userData.error);
      }
    }, req, res);
}