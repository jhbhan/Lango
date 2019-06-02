"use strict"
///////////////////
///NODE MODULES////
///////////////////
//FOR LOG IN
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20');
//for API
const APIrequest = require('request');
const http = require('http');
const APIkey = "SOME API KEY";  // ADD API KEY HERE
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey//always remains the same don't change
//for AJAX
const express = require('express')
const port = 53584
//for SQL
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system
const dbFileName = "Flashcards.db";
const db = new sqlite3.Database(dbFileName);  // object, not database.

const app = express()
// pipeline stage that just echos url, for debugging

const googleLoginData = {
    clientID: '137558159232-5besel5i0ct99n430hvjsf3gdcu2vgbd.apps.googleusercontent.come',
    clientSecret: 'BhV7V5CFP6V8DUe_CqeBpNug',
    callbackURL: '/auth/redirect'
};//log in credential that tells user that this is registered for this service,
//Google that where to come back to.
passport.use( new GoogleStrategy(googleLoginData, gotProfile) );//setting up passport to be used


//puts together the server pipeline
//FOR EXPRESS AJAX CALLING

app.use('/', printURL);//printing for debug purposes
//app.use preps middle wares
app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    keys: ['hanger waldo mercy dance']// meaningless random string used by encryption
}));
app.use(passport.initialize()); // Initializes request object for further handling by passport
app.use(passport.session()); // If there is a valid cookie, will call deserializeUser()

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/translate', translateHandler); //if /translate
app.get('/store', storeHanlder); //if /store
app.use( fileNotFound );
app.listen(port, function (){console.log('Listening...');} )

//for debugging
function printURL (req, res, next) {
    console.log(req.url);
    next();
}

//
//
//
//
//
//
////////////////
app.get('/auth/google', passport.authenticate('google',{ scope: ['profile'] }) );//if /auth/google
app.get('/auth/redirect',
    // for educational purposes
    function (req, res, next) {
        console.log("at auth/redirect");
        next();
    },
    // This will issue Server's own HTTPS request to Google
    // to access the user's profile information with the 
    // temporary key we got in the request. 
    passport.authenticate('google'),
    // then it will run the "gotProfile" callback function,
    // set up the cookie, call serialize, whose "done" 
    // will come back here to send back the response
    // ...with a cookie in it for the Browser! 
    function (req, res) {
        console.log('Logged in and using cookies!')
        res.redirect('/user/hello.html');
    });

app.get('/user/*',
    isAuthenticated, // only pass on to following function if
    // user is logged in 
    // serving files that start with /user from here gets them from ./
    express.static('.') 
       ); 

// next, all queries (like translate or store or get...
app.get('/query', function (req, res) { res.send('HTTP query!') });

function gotProfile(accessToken, refreshToken, profile, done) {
    console.log("Google profile",profile);
    // here is a good place to check if user is in DB,
    // and to store him in DB if not already there. 
    // Second arg to "done" will be passed into serializeUser,
    // should be key to get user out of database.

    let dbRowID = 1;  // temporary! Should be the real unique
    // key for db Row for this user in DB table.
    // Note: cannot be zero, has to be something that evaluates to
    // True.  

    done(null, dbRowID); 
}



////////////////
//                    
//
//
////////////////
              //
              //
              //
////////////////

function initDB(user, english, korean, seen, correct){

    const cmdStr = 'CREATE TABLE Flashcards (user INT, english TEXT UNIQUE, korean TEXT, seen INT, correct INT)'
    db.run(cmdStr,tableCreationCallback);

    function tableCreationCallback(err) {
        if (err) {
            if (err.errno == 1){//Table already exists
                insertDB(user, english, korean, seen, correct);
                return;
            }
            else{//Table could not be created
                console.log("Table creation error",err);
            } 
        } else {//Table was created
            console.log("Database created");
            insertDB(user, english, korean, seen, correct);
            return;
        }
    }
}

function insertDB(user, english, korean, seen, correct){
    const cmdStr = 'INSERT into Flashcards (user, english, korean, seen, correct) VALUES (1, @0, @1, 0, 0)'

    db.run(cmdStr, english, korean, insertCallback);
    
    function insertCallback(err) {
        if (err) { console.log(err); }
    }
}

// if seen /translate as query goes to this.
function translateHandler(req, res, next) {

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
        console.log(kor);
        initDB(1,eng,kor,0,0);
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


      /////
      // //
     //. ///
    //.  ///
   /////////
  //.     //
 //.      //
//.       //
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


