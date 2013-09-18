var ACS = require('acs').ACS;

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
            // '/adults' is the active one after login
		    res.redirect("/adults");
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