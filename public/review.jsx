// import { withRouter } from 'react-router';

class CardPage extends React.Component {
  constructor(props){
    super(props);
    this.state = { userAnswer: "", seen: 0, changed: false, displayed: "",numCorrect: 0, correct: false, firstWord: true};
    
    this.saveInput = this.saveInput.bind(this);
    this.checkReturn = this.checkReturn.bind(this);
    this.receivedFirstWord = this.receivedFirstWord.bind(this);
    this.getDB = this.getDB.bind(this);
    // this.sendTranslateRequest = this.sendTranslateRequest.bind(this);
  //   this.startReview = this.startRewview.bind(this);
  }
  
  saveInput(event){
    //Updates value whenever textbox is changed
    this.setState({userAnswer: event.target.value});

  }
  
  getDB() {
    console.log("got in");
    //intialize the output in the beginnning. 
    const url = '/getDB'

    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onload = function () {
        console.log("when loaded");
        var responseStr = xhr.responseText;
        var object = JSON.parse(responseStr);
        this.setState({ displayed: WordToDispplay });
        // event.receivedFirstWord(object.korean); //ask Jason what's the first word here? 
        console.log(object.Korean);
    };
    xhr.onerror = function () {
        console.log("did not work");
    };
    xhr.send();
}

receivedFirstWord(WordToDispplay) {
  this.setState({ firstWord: false });
  this.setState({ displayed: WordToDispplay });
}

  checkReturn(event){
    //Checks if enter is pressed
    if(event.charCode == 13){
      this.sendTranslateRequest(this.state.value, this);
      //flip the card above. 
      // if correct then CORRECT GREEN
      // if wrong then the correct english transaltion. 
    }
  }
  

  addButton(){
    // this.context.router.push('/home.html');
  }
  
  receivedTranslateRequest(translatedWord){
    //After response is received
    this.setState({changed: true});
    this.setState({displayed: translatedWord});
  }

  checkReturn(event){
    if(event.charCode == 13){
        this.sendCheckRequest(this.state.userAnswer, this.state.numCorrect, this.state.correct);
        //flip the card above. 
        // if correct then CORRECT GREEN
        // if wrong then the correct english transaltion. 
      }
}

sendCheckRequest(userAnswer, numCorrect, correct){

}
  
  updateOutput(){
    //To change what's in the output box
    return this.state.displayed;
  }
  componentDidMount(){
    this.getDB();
  }

  render() {
    let reviewOutput;
    // this.getDB();
    reviewOutput = <textarea id="input" value={this.state.displayed} placeholder="Korean" />; //first word to display on the screen. 
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
