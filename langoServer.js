"use strict"

//FOR API REQUESTS
const APIrequest = require('request');
const http = require('http');
const APIkey = "AIzaSyBM7tsLhSZqKXgfDxCldqdK8qrYlmlaANg";  // ADD API KEY HERE
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey//always remains the same don't change
//for GENERAL USAGE
const express = require('express')
const port = 53584
//for SQL
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system
const dbFileName = "Flashcards.db";
const db = new sqlite3.Database(dbFileName);  // object, not database.

function initUserDB(first, last, userID){
    const cmdStr = 'CREATE TABLE Users (first TEXT, last TEXT, userID TEXT UNIQUE)'
    db run(cmdStr, tableCreationCallback);

    function tableCreationCallback(err){
        if (err) {
            if (err.errno == 1){//Table already exists
                insertUserDB(first, last, userID);
                return;
            }
            else{//Table could not be created
                console.log("Table creation error",err);
            } 
        } else {//Table was created
            console.log("Database created");
            insertUserDB(first, last, userID);
            return;
        } 
    }
}

function insertUserDB(first, last, userID){
    const cmdStr = 'INSERT into Users (first, last, userID) VALUES (@0, @1, @2)'

    db.run(cmdStr, first, last, userID);
    
    function insertCallback(err) {
        if (err) { console.log(err); }
    }
}

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


//puts together the server pipeline
//FOR EXPRESS AJAX CALLING
const app = express()

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/translate', translateHandler);
app.get('/store', storeHanlder);
app.use( fileNotFound );
app.listen(port, function (){console.log('Listening...');} )

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


