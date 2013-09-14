var ACS = require('acs').ACS;

function index(req, res) {
	res.render('index');
}

function home (req, res) {

    var adultCases, gerCases, pedCases, womenCases;

    //get data from the server, and create the test cases
    ACS.Objects.query({
        classname: 'soap',
        where: {
            rootCase: "Adults"
        },
        order: 'created_at'
    
    }, 
    function (data) {
        if (data.success) {
            res.render('home', {
                name: req.session.firstName,
                cases: data.soap 
            });
            
        } else {
            console.log(data);
        }
    });

    
}

function error (req, res) {
    res.render('error');
}

function login(req,res){

    ACS.Users.login({
        // grab data from http post
        login: req.body.email,
        password: req.body.password
    }, 
    function(data) {
    	if (data.success){
    		// set session data to be used later througout the app
            req.session.session_id=data.meta.session_id;
            req.session.user_id=data.users[0].id;
            req.session.firstName = data.users[0].first_name;
            req.session.fullname=data.users[0].first_name + ' ' +
            data.users[0].last_name;
            console.log(data);
            // the "home" controller will pick it up
		    res.redirect("/home");
    	}
        else {
    		res.redirect("/error");
    	}
    });
}

function logout (req, res) {
     ACS.Users.logout(function(data) {
        delete req.session.session_id;
        res.redirect('/');
    });
}