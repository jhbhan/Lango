function submit(){
    let word =  document.getElementById("word").value;
    let url = "translate?english="+word;

    console.log("berfore xml request");
    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onload = function() {
     	let responseStr = xhr.responseText;
     	let object = JSON.parse(responseStr);
        console.log(object);
     	document.getElementById("outputGoesHere").textContent = object.Korean;

     };
     xhr.onerror = function() {
     	console.log("did not work");
     };
    xhr.send(); 
}