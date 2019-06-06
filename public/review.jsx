/*
   This flipcard component is based on the flipcard component by
   Alex Devero, at:
   
      https://reactjsexample.com/react-flipping-card-with-tutorial/

   It was modified for ECS 162 by Nina Amenta, May 2019.
*/


const cardContainer = document.querySelector('.react-card');

// React component for form inputs
class CardInput extends React.Component {
  render() {
    return(
      <fieldset>
        <input name={this.props.name} id={this.props.id} type={this.props.type || 'text'} placeholder={this.props.placeholder} required />
      </fieldset>
    )
  }
}

// React component for textarea
class CardTextarea extends React.Component {
  render() {
    return(
      <fieldset>
        <textarea name={this.props.name} id={this.props.id} placeholder={this.props.placeholder} required ></textarea>
      </fieldset>
    )
  }
}


// React component for the front side of the card
class CardFront extends React.Component {
  render(props) {
    return(
      <div className='card-side side-front'>
         <div className='card-side-container'>
              <h2 id='trans'>{this.props.text}</h2>
        </div>
      </div>
    )
  }
}

// React component for the back side of the card
class CardBack extends React.Component {
  render(props) {
    return(
      <div className='card-side side-back'>
         <div className='card-side-container'>
              <h2 id='congrats'>{this.props.text}</h2>
        </div>
      </div>
    )
  }
}

// React component for the card (main component)
class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = { userAnswer: "", output: "No Answer", correct: "false", displayed: "",numCorrect: 0, firstWord: true, userName: ""};
    
    this.saveInput = this.saveInput.bind(this);
    this.checkReturn = this.checkReturn.bind(this);
    this.getDB = this.getDB.bind(this);
    this.getFirstName = this.getFirstName(this);
    // this.receivedFirstWord = this.receivedFirstWord.bind(this);
    // this.getDB = this.getDB.bind(this);
    // this.sendTranslateRequest = this.sendTranslateRequest.bind(this);
  //   this.startReview = this.startRewview.bind(this);
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
        this.setState({ displayed: object[0].korean });
        // event.receivedFirstWord(object.korean); //ask Jason what's the first word here? 
        console.log(object[0].korean);
    };
    xhr.onerror = function () {
        console.log("did not work");
    };
    xhr.send();
}

getFirstName(){
  console.log("got in");
  //intialize the output in the beginnning. 
  const url = '/getName'
  var xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  xhr.onload = function () {
      console.log("when loaded");
      var responseStr = xhr.responseText;
      var object = JSON.parse(responseStr);
      this.setState({ userName: object[0].first});
      // event.receivedFirstWord(object.korean); //ask Jason what's the first word here? 
      // console.log(object[0].korean);
  };
  xhr.onerror = function () {
      console.log("did not work");
  };
  xhr.send();
}



  checkReturn(event){
    if(event.charCode == 13){
      console.log("got in!")
      if(this.state.userAnswer == "Volare"){
        this.setState({correct: "true"});
        // this.forceUpdate();
        console.log("correct!")
      }
      else{
        this.setState({output: "false"});
        this.setState({correct: "false"});
        console.log("false!")
      }
      //flip the card above. 
      // if correct then CORRECT GREEN
      // if wrong then the correct english transaltion. 
    }
  }

  saveInput(event){
    this.setState({userAnswer: event.target.value});
  }

  updateOutput(){
    //To change what's in the output box
    return this.state.output;
  }
  componentDidMount(){
    this.getDB();
    this.getFirstName();
  }

  render() {
    console.log("rendered");
    let output;
    if(this.state.correct == "true"){
      console.log("hi");
      // output = <textarea id="correct!" text={this.updateOutput()}/>;
      output = "correct";
    }
    else{
      console.log("bye");
      output  = "nothing";
    }

    let translation;
    translation = this.state.displayed; //first word to display on the screen. 
    let userID;
    userID = this.state.user;
    return(
      <div> 
      <div className='card-container'>
        <div className='card-body'>
          <CardBack text= {output} />

          <CardFront text= {translation} />
        </div>
      </div>
      <div className="textcard">
                <textarea id="output" placeholder="Translate the word above to English" onKeyPress={this.checkReturn} onChange={this.saveInput} />
      </div>
      <div>
        {user}
      </div>
      </div>
    )
  }
}

// Render Card component
ReactDOM.render(<Card />, cardContainer);
