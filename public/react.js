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
    return React.createElement("div", {class: "textcard"},
    		React.createElement("textarea", {id: "input",onKeyPress: "checkReturn()"}),
    		React.createElement("p", {id: "output"}, "Korean"));
}

function SaveButton() {
    return React.createElement("div", { class: "save_button"},
    		React.createElement("button", {onClick: "save()"}, "Save"));
}

function OutputCard(){
    return React.createElement(
        "div",
        {className: "textCard"},
        React.createElement("p",null,"korean")
    )
}

// An element with some contents, including a variable
// that has to be evaluated to get an element, and some
// functions that have to be run to get elements. 
var main = React.createElement(
    "main",
    null,
    lango,
    React.createElement(FirstInputCard, null),
    React.createElement(SaveButton, null)
  //  React.createElement(FirstCard, null),
 //   React.createElement(OutputCard,null)
);

ReactDOM.render(main, document.getElementById('root'));

// onKeyPress function for the textarea element
// When the charCode is 13, the user has hit the return key
function checkReturn(event) {
    console.log(event.charCode);
}