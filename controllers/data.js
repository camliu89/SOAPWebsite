var ACS = require('acs').ACS;

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
            req.session.caseRoot = "/adults";
            res.render('home', {
                id: 'adults',
                name: req.session.firstName,
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
            req.session.caseRoot = "/pediatrics";
            res.render('home', {
                id: 'pediatrics',
                name: req.session.firstName,
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
            req.session.caseRoot = "/geriatrics";
            res.render('home', {
                id: 'geriatrics',
                name: req.session.firstName,
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
            req.session.caseRoot = "/women";
            res.render('home', {
                id: 'women',
                name: req.session.firstName,
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
    res.render('discussion', {
        back: req.session.caseRoot,
        title: req.session.holdData[0].testcase,
        discussion: req.session.holdData[0].Discussion[0].Summary
    });
}
