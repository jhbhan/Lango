function getDB(){
	const url = '/getDB'

	var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onload = function () {
        console.log("when loaded");
        var responseStr = xhr.responseText;
        var object = JSON.parse(responseStr);
    };
    xhr.onerror = function () {
        console.log("did not work");
    };
    xhr.send();
}

function update(english, seen, numCorrect, correct){
	///update?english=pie&seen=3&correct=3
	if(correct){
		numCorrect=numCorrect+1;
	}
	let query = 'english='+english+'&seen='+seen+'&correct='numCorrect;
	let url = '/update?'+query;

	var xhr = new XMLHttpRequest();
	xhr.open("GET",url,true);

	xhr.onload = function () {
        console.log("worked");
    };
    xhr.onerror = function () {
        console.log("did not work");
    };

}