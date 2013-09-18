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
            rootCase: "Women",
            testcase: req.params.testcase
        },
        order: 'created_at'
    
    }, 
    function (data) {
        if (data.success) {
            console.log(data);
            
        } else {
            console.log(data);
        }
    });
}
