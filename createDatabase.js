const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system
const dbFileName = "Flashcards.db";
const db = new sqlite3.Database(dbFileName);  // object, not database.:wq

function initUserDB(){

    const cmdStr = 'CREATE TABLE Users (first TEXT, last TEXT , userID TEXT UNIQUE)'
    db.run(cmdStr,tableCreationCallback);

    function tableCreationCallback(err) {
        if (err) {
            if (err.errno == 1){//Table already exists
            	console.log("Table already exists",err);
                return;
            }
            else{//Table could not be created
                console.log("Table creation error",err);
            } 
        } else {//Table was created
            console.log("Table created");
            return;
        }
    }
}

function initDB(user, english, korean, seen, correct){

    const cmdStr = 'CREATE TABLE Flashcards (user TEXT, english TEXT UNIQUE, korean TEXT, seen INT, correct INT)'
    db.run(cmdStr,tableCreationCallback);

    function tableCreationCallback(err) {
        if (err) {
            if (err.errno == 1){//Table already exists
            	console.log("Table already exists",err);
                return;
            }
            else{//Table could not be created
                console.log("Table creation error",err);
            } 
        } else {//Table was created
            console.log("Table created");
            return;
        }
    }
}

initDB();
initUserDB();