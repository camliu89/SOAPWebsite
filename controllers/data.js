var ACS = require('acs-node');

function adults (req, res) {

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

            var m = require('/modules/utilities');
            //console.log(m.has(req.session.casesDone, data.soap[0].id));

            for (var i = 0; i < data.soap.length; i++) {
                if (m.has(req.session.casesDone, data.soap[i].id)) {
                    data.soap[i].done = true;
                }
                else {
                    data.soap[i].done = false;
                }
            }
            
            req.session.caseRoot = "/adults";
            res.render('home', {
                id: 'adults',
                name: req.session.firstName,
                role: req.session.role,
                cases: data.soap
            });
            
        } else {
            console.log(data);
        }
    });
}

function pediatrics (req, res) {

    //get data from the server, and create the test cases
    ACS.Objects.query({
        classname: 'soap',
        where: {
            rootCase: "Pediatrics"
        },
        order: 'created_at'
    
    }, 
    function (data) {
        if (data.success) {

            var m = require('/modules/utilities');
            //console.log(m.has(req.session.casesDone, data.soap[0].id));

            for (var i = 0; i < data.soap.length; i++) {
                if (m.has(req.session.casesDone, data.soap[i].id)) {
                    data.soap[i].done = true;
                }
                else {
                    data.soap[i].done = false;
                }
            }

            req.session.caseRoot = "/pediatrics";
            res.render('home', {
                id: 'pediatrics',
                name: req.session.firstName,
                role: req.session.role,
                cases: data.soap
            });
            
        } else {
            console.log(data);
        }
    });
}
function geriatrics (req, res) {

    //get data from the server, and create the test cases
    ACS.Objects.query({
        classname: 'soap',
        where: {
            rootCase: "Geriatrics"
        },
        order: 'created_at'
    
    }, 
    function (data) {
        if (data.success) {

            var m = require('/modules/utilities');
            //console.log(m.has(req.session.casesDone, data.soap[0].id));

            for (var i = 0; i < data.soap.length; i++) {
                if (m.has(req.session.casesDone, data.soap[i].id)) {
                    data.soap[i].done = true;
                }
                else {
                    data.soap[i].done = false;
                }
            }

            req.session.caseRoot = "/geriatrics";
            res.render('home', {
                id: 'geriatrics',
                name: req.session.firstName,
                role: req.session.role,
                cases: data.soap
            });
            
        } else {
            console.log(data);
        }
    });
}

function women (req, res) {

    //get data from the server, and create the test cases
    ACS.Objects.query({
        classname: 'soap',
        where: {
            rootCase: "Women"
        },
        order: 'created_at'
    
    }, 
    function (data) {
        if (data.success) {

            var m = require('/modules/utilities');
            //console.log(m.has(req.session.casesDone, data.soap[0].id));

            for (var i = 0; i < data.soap.length; i++) {
                if (m.has(req.session.casesDone, data.soap[i].id)) {
                    data.soap[i].done = true;
                }
                else {
                    data.soap[i].done = false;
                }
            }

            var m = require('/modules/utilities');
            console.log(m.has(req.session.casesDone, data.soap[0].id));
            req.session.caseRoot = "/women";
            res.render('home', {
                id: 'women',
                name: req.session.firstName,
                role: req.session.role,
                cases: data.soap
            });
            
        } else {
            console.log(data);
        }
    });
}

function getData (req, res) {
    //get data from the server, and create the test cases
    ACS.Objects.query({
        classname: 'soap',
        where: {
            id: req.params.id
        },
        order: 'created_at'
    
    }, 
    function (data) {
        if (data.success) {
            req.session.holdData = data.soap;
            res.render('subjectiveObjective', {
                title: req.session.holdData[0].testcase,
                subjective: req.session.holdData[0].Subjective,
                objective: req.session.holdData[0].Objective,
                id: req.session.caseRoot + "/" + req.params.id,
                back: req.session.caseRoot
            });
        } else {
            console.log(data);
        }
    });
}

function assestment (req, res) {
    res.render('assestment', {
        id: req.session.caseRoot + "/" + req.params.id,
        back: req.session.caseRoot,
        title: req.session.holdData[0].testcase,
        assestments: req.session.holdData[0].Assestment
    });
}

function plan (req, res) {
    res.render('plan', {
        id: req.session.caseRoot + "/" + req.params.id,
        back: req.session.caseRoot,
        title: req.session.holdData[0].testcase,
        plans: req.session.holdData[0].Plan
    });
}

function discussion (req, res) {

    var caseId = req.params.id;
    var casesDone = req.session.casesDone;
    //if no cases had been completed
        if (casesDone == 0) {
            //Adding the id case to the user cloud data
            casesDone.push(caseId);   
            //var cloud = require('/ui/common/CloudData');
            updateCasesDone(req, res, casesDone);
        }
        //Check if case is done previously
        //if not, add the case id to the user cloud data
        else {
            for (var i = 0; i < casesDone.length; i++) {
                var caseDone = casesDone[i];
                if(caseDone === caseId) {
                    break;
                }
                if(i == casesDone.length - 1) {
                    //Adding the id case to the user cloud data
                    casesDone.push(caseId);   
                    //var cloud = require('/ui/common/CloudData');
                    updateCasesDone (req, res, casesDone)
                }
            }
        }
    res.render('discussion', {
        back: req.session.caseRoot,
        title: req.session.holdData[0].testcase,
        discussion: req.session.holdData[0].Discussion[0].Summary
    });
}

//Update cases done to the user profile
function updateCasesDone (req, res, cases) {

    ACS.Users.update({
        custom_fields: {
            casesDone: cases
        }
    }, function(data) {

        if(data.success) {
            console.log ('Cases updated');
        } else {
            console.log("Update user error: " + data.meta.message);

        }
    }, req, res);
    
}
