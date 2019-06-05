"use strict"
///////////////////
//Constant Values//
///////////////////
//for API
const APIrequest = require('request');
const http = require('http');
const APIkey = "AIzaSyD9g1FCMUxnPrQlEJtLS8EavxUCp8zE88U";  // ADD API KEY HERE
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey//always remains the same don't change
//for AJAX
const express = require('express')
const port = 53584
//for SQL
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system
const dbFileName = "Flashcards.db";
const db = new sqlite3.Database(dbFileName);  // object, not database.
//for login
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20');

//SERVER PIPELINE
//PRE LOGIN
const googleLoginData = {
    clientID: '137558159232-fl7b8fq222qeo4t62d5nvvq4a6smk27n.apps.googleusercontent.com',
    clientSecret: 'MWByQ6R62H2CGOUqPawqEtmz',
    callbackURL: '/auth/redirect'
};
passport.use( new GoogleStrategy(googleLoginData, gotProfile) );
const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    // meaningless random string used by encryption
    keys: ['hanger waldo mercy dance']  
}));
app.use(passport.initialize()); 
app.use(passport.session()); 
app.get('/*',express.static('public'));
app.get('/auth/google',
    passport.authenticate('google',{ scope: ['profile'] }) );
app.get('/auth/redirect',
    function (req, res, next) {
        console.log("at auth/redirect");
        next();
    },
    passport.authenticate('google'),
    function (req, res) {
    let numFlashcards = 1;
    const cmd = 'SELECT * FROM Users WHERE userID="'+req.user+'";';
    db.all(cmd,function(err,rows){
        if (err){
            throw err;
        }
        rows.forEach(function (row) {
        numFlashcards =+ 1;
        });
        console.log("hi");
    });

    console.log(numFlashcards);
    console.log('Logged in and using cookies!');
    if (numFlashcards == 0) {
        res.redirect('/save.html');
        }
    else {
        res.redirect('/Review.html');
    }
    
    });
app.get('/user/*',
    isAuthenticated, // only pass on to following function if
    // user is logged in 
    // serving files that start with /user from here gets them from ./
    express.static('.') 
       ); 
app.get('/query', function (req, res) { res.send('HTTP query!') });



//POST LOGIN
app.get('/translate', translateHandler);
app.get('/store', storeHanlder);
app.use( fileNotFound );
app.listen(port, function (){console.log('Listening...');} )

//
////
// //
//  //
///////
//    //
//    //
//    //
function printURL (req, res, next) {
    console.log(req.url);
    next();
}

// function to check whether user is logged when trying to access
// personal data
function isAuthenticated(req, res, next) {
    if (req.user) {
    console.log("Req.session:",req.session);
    console.log("Req.user:",req.user);
    next();
    } else {
    res.redirect('/login.html');  // send response telling
    // Browser to go to login page
    }
}


// function for end of server pipeline
function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
    }

// Some functions Passport calls, that we can use to specialize.
// This is where we get to write our own code, not just boilerplate. 
// The callback "done" at the end of each one resumes Passport's
// internal process. 

// function called during login, the second time passport.authenticate
// is called (in /auth/redirect/),
// once we actually have the profile data from Google. 
function gotProfile(accessToken, refreshToken, profile, done) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!IN PROFILE!!!!!!!!!!!!!!!!!");
    console.log("Google profile",profile);
    console.log(profile.id);
    // here is a good place to check if user is in DB,
    // and to store him in DB if not already there. 
    // Second arg to "done" will be passed into serializeUser,
    // should be key to get user out of database.



    let dbRowID = profile.id;  // temporary! Should be the real unique
    // key for db Row for this user in DB table.
    // Note: cannot be zero, has to be something that evaluates to
    // True.  

    insertUserDB(profile.name.givenName, profile.name.familyName, dbRowID);


    done(null, dbRowID); 
}

// Part of Server's sesssion set-up.  
// The second operand of "done" becomes the input to deserializeUser
// on every subsequent HTTP request with this session's cookie. 
passport.serializeUser((dbRowID, done) => {
    console.log("SerializeUser. Input is",dbRowID);
    done(null, dbRowID);
});

// Called by passport.session pipeline stage on every HTTP request with
// a current session cookie. 
// Where we should lookup user database info. 
// Whatever we pass in the "done" callback becomes req.user
// and can be used by subsequent middleware.
passport.deserializeUser((dbRowID, done) => {
    console.log("deserializeUser. Input is:", dbRowID);
    // here is a good place to look up user data in database using
    // dbRowID. Put whatever you want into an object. It ends up
    // as the property "user" of the "req" object. 
    let userData = {userData: dbRowID};
    done(null, userData);
});

//////////////////////////

//////////////////////////

//////////////////////////

//////////////////////////

//////////////////////////

//////////////////////////

//////////////////////////

//////////////////////////

//////////////////////////

//////////////////////////


function insertUserDB(first,last,userID){
    const cmdStr = 'INSERT into Users (first,last,userID) VALUES (@0, @1, @2)'

    db.run(cmdStr, first,last,userID, insertCallback);
    
    function insertCallback(err) {
        if (err) { console.log(err); }
    }
}

function insertDB(user, english, korean, seen, correct){
    const cmdStr = 'INSERT into Flashcards (user, english, korean, seen, correct) VALUES (@0, @1, @2, 0, 0)'

    db.run(cmdStr, user, english, korean, insertCallback);
    
    function insertCallback(err) {
        if (err) { console.log(err); }
    }
}

// if seen /translate as query goes to this.
function translateHandler(req, res, next) {

console.log(req.user);

    let qObj = req.query;

//if qObject.english != undefined -> run the function
//if qObject.korean != undefined -> insert
//else just translate (call API)

    if (qObj.english != undefined){

        let requestObject = 
        {
            "source": "en",
            "target": "ko",
            "q": [qObj.english]
        }

        returnFunction(res, requestObject);
    }
    else {
    next();
    }
}

function storeHanlder(req, res, next) {

    let qObj = req.query;

//if qObject.english != undefined -> run the function
//if qObject.korean != undefined -> insert
//else just translate (call API)

    if (qObj.english != undefined && qObj.korean != undefined){
        let eng = qObj.english;
        let kor = qObj.korean;
    let user = "Jeonghwan";
        console.log(kor);
        insertDB(user,eng,kor,0,0);
        console.log("inserted");
    }
    else {
    next();
    }
}

function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
}//query file not found


/////////////////////////// 
//FOR SERVER TO API CALLING
///////////////////////////
function returnFunction(res, requestObject){
    function APIcallback(err, APIresHead, APIresBody) {
        if ((err) || (APIresHead.statusCode != 200)) {// API is not working
            console.log("Got API error");
            console.log(APIresBody);
        } else {
            if (APIresHead.error) {// API worked but is not giving you data
            console.log(APIresHead.error);
            } else {// API works and gives you data
                
                let englishText = requestObject.q[0];
                let translatedText = APIresBody.data.translations[0].translatedText;

                console.log("return");
                res.json({
                            "English" : englishText,
                            "Korean" : translatedText
                        });
            }
        }
    }
    APIrequest(
        { // HTTP header
            url: url,
            method: "POST",
            headers: {"content-type": "application/json"},
            json: requestObject// will turn the given object into JSON
        },
        // callback function for API request
        APIcallback
        );
}

