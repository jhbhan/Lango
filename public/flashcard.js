'use strict';

// An element to go into the DOM

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
    let url = "store?english="+eng+"&korean="+kor;
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
