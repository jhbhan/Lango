'use strict';

// An element to go into the DOM

var lango = React.createElement(
    "h1",
    { id: "logo" },
    "Lango!"
);

// A component - function that returns some elements 
function FirstCard() {
    return React.createElement(
        "div",
        { className: "textCard" },
        React.createElement(
            "p",
            null,
            "Hello, world!"
        )
    );
}

// Another component
function FirstInputCard() {
    return React.createElement(
        "div",
        { className: "textCard" },
        React.createElement("textarea", { onKeyPress: checkReturn })
    );
}

// An element with some contents, including a variable
// that has to be evaluated to get an element, and some
// functions that have to be run to get elements. 
var main = React.createElement(
    "main",
    null,
    lango,
    React.createElement(FirstInputCard, null),
    React.createElement(FirstCard, null)
);

ReactDOM.render(main, document.getElementById('root'));

// onKeyPress function for the textarea element
// When the charCode is 13, the user has hit the return key
function checkReturn(event) {
    console.log(event.charCode);
}

//pressing submit button
function submit(){
    let word =  document.getElementById("word").value;
    let url = "translate?english="+word;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onload = function() {
     	let responseStr = xhr.responseText;
     	let object = JSON.parse(responseStr);
     	document.getElementById("outputGoesHere").textContent = object.Korean;

     };
     xhr.onerror = function() {
     	console.log("did not work");
     };
    xhr.send(); 
}

function save(){
    let eng =  document.getElementById("word").value;
    let kor = document.getElementById("outputGoesHere").textContent;
    let url = "translate?english="+eng+"&korean="+kor;
    console.log(url);

    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onload = function() {
        console.log("saved");
     };
     xhr.onerror = function() {
        console.log("did not work");
     };
    xhr.send(); 
}
