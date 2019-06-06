// import { withRouter } from 'react-router';

class CardPage extends React.Component {
  constructor(props){
    super(props);
    this.state = { userAnswer: "", seen: 0, changed: false, displayed: "",numCorrect: 0, correct: false, firstWord: true, counter: 0, responseStr: ""};
    
    this.saveInput = this.saveInput.bind(this);
    this.checkReturn = this.checkReturn.bind(this);
    // this.receivedFirstWord = this.receivedFirstWord.bind(this);
    this.getDB = this.getDB.bind(this);
    this.next = this.next.bind(this);
    // this.next = this.next.bind(this);
    // this.setDisplay = this.setDisplay(this);
    // this.sendTranslateRequest = this.sendTranslateRequest.bind(this);
  //   this.startReview = this.startRewview.bind(this);
  }
  
  saveInput(event){
    //Updates value whenever textbox is changed
    this.setState({userAnswer: event.target.value});

  }
  
  getDB() {
    console.log("got in");

   // var response = [{ user: '112956219092631454438', english: 'dddd', korean: 'asg',seen: 0,correct: 0,score: 9.95 },{ user: '112956219092631454438',english: 'ggg',korean: 'bysse',seen: 0,correct: 0,score: 4 } ];
    var object = [{ user: '112956219092631454438', english: 'dddd', korean: 'asg',seen: 0,correct: 0,score: 9.95 },{ user: '112956219092631454438',english: 'ggg',korean: 'bysse',seen: 0,correct: 0,score: 4 },{ user: '112956219092631454438',english: 'aaaaa',korean: 'jfjfjfj',seen: 0,correct: 0,score: 4 } ];
    console.log(object[0].korean);
    this.setState({displayed:object[0].korean});
    this.setState({responseStr: object});
    console.log(this.state.responseStr);
    //console.log(object[0].korean);
    //this.setState({ displayed: object[0].korean });
    //console.log(this.state.displayed);
    //intialize the output in the beginnning. 
   // this.setState({ responseStr: response });
    /*
    const url = '/getDB'

    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onload = function () {
        console.log("when loaded");
        var response = xhr.responseText;
        this.setState({ responseStr: response });
        // event.receivedFirstWord(object.korean); //ask Jason what's the first word here? 
    }.bind(this);
    xhr.onerror = function () {
        console.log("did not work");
    };
    xhr.send();*/
}

next(){
  var counter = this.state.counter + 1;
  var object = this.state.responseStr;
  this.setState({displayed:object[counter].korean});
  this.setState({counter:counter});
  //update database.
}



getFirstName() {
  console.log("got in2");
  //intialize the output in the beginnning. 
  const url = '/getName'

  var xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  xhr.onload = function () {
      console.log("when loaded");
      var responseStr = xhr.responseText;
      var object = JSON.parse(responseStr);
      this.setState({ displayed: object.first});
      // event.receivedFirstWord(object.korean); //ask Jason what's the first word here? 
      console.log(object[0].korean);
  }.bind(this);
  xhr.onerror = function () {
      console.log("did not work");
  };
  xhr.send();
}

checkReturn(event){
    //Checks if enter is pressed
    if(event.charCode == 13){
      // this.sendTranslateRequest(this.state.value, this);
      //flip the card above. 
      // if correct then CORRECT GREEN
      // if wrong then the correct english transaltion. 
    }
  }
  

  
  updateOutput(){
    //To change what's in the output box
    return this.state.displayed;
  }

  componentDidMount(){
    this.getDB();
    this.getFirstName();
  }

  render() {
    let reviewOutput;
    // this.getDB();
    reviewOutput = this.state.displayed;
    console.log(reviewOutput);
    // <textarea id="input" value={this.state.displayed} placeholder="Korean" />; //first word to display on the screen. 
    // }
    // else {
    //     reviewOutput = <textarea id="input" readOnly={true} placeholder="Korean" />; 
    // }

    return (
        <div>
            <h1 id="logo">Lango!</h1>
            <div className="add_button"> <button onClick={this.addButton}>Add</button></div>
            <div className="textcard">
                {reviewOutput}
            </div>
            <div className="textcard">
                <textarea id="output" placeholder="Translate the word above to English" onKeyPress={this.checkReturn} onChange={this.saveInput} />
            </div>
            <div className="next_button">
                <button onClick={this.next}>Next</button>
            </div>
        </div>
    );
}
}



ReactDOM.render(
  <CardPage/>,
  document.getElementById('root')
);
