var ACS = require('acs-node');

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
            req.session.role=data.users[0].role;
            req.session.casesDone = data.users[0].custom_fields.casesDone;
            // '/adults' is the active one after login
		    res.redirect("/adults");
    	}
        else {
    		res.redirect("/error");
    	}
    }, req, res);
}

function logout (req, res) {
     ACS.Users.logout(function(data) {
        delete req.session.session_id;
        res.redirect('/');
    });
}

function submitRegister (req, res) {

    ACS.Users.create ({
        email: req.body.email,
        first_name: req.body.first,
        last_name: req.body.last,
        password: req.body.password,
        password_confirmation: req.body.password,
        custom_fields: {
            casesDone: []
        }
    },
    function (data) {
        if(data.success) {
            res.render("index", {
                loginCorrect: true,
                message: "Now, please check your email to activate your account."
            });
        }
        else {
            res.render("register", {
                hasError: true,
                error: data.message
            });
        }
    });
}

function updateUserCases (req, res) {

}