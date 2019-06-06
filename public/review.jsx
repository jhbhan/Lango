// import { withRouter } from 'react-router';
const cardContainer = document.querySelector('.react-card');

// React component for form inputs
class CardInput extends React.Component {
  render() {
    return (
      <fieldset>
        <input name={this.props.name} id={this.props.id} type={this.props.type || 'text'} placeholder={this.props.placeholder} required />
      </fieldset>
    )
  }
}

// React component for textarea
class CardTextarea extends React.Component {
  render() {
    return (
      <fieldset>
        <textarea name={this.props.name} id={this.props.id} placeholder={this.props.placeholder} required ></textarea>
      </fieldset>
    )
  }
}


// React component for the front side of the card
class CardFront extends React.Component {
  render(props) {
    return (
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
    return (
      <div className='card-side side-back'>
        <div className='card-side-container'>
          <h2 id='congrats'>{this.props.text}</h2>
        </div>
      </div>
    )
  }
}
class CardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userAnswer: "", seen: 0, changed: false, displayed: "", numCorrect: 0, correct: false, firstWord: true, counter: 0, responseStr: "", translated: ""};

    this.saveInput = this.saveInput.bind(this);
    this.checkReturn = this.checkReturn.bind(this);
    // this.receivedFirstWord = this.receivedFirstWord.bind(this);
    this.getDB = this.getDB.bind(this);
    this.next = this.next.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.next = this.next.bind(this);
    // this.setDisplay = this.setDisplay(this);
    // this.sendTranslateRequest = this.sendTranslateRequest.bind(this);
    //   this.startReview = this.startRewview.bind(this);
  }

  saveInput(event) {
    //Updates value whenever textbox is changed
    this.setState({ userAnswer: event.target.value });

  }

  getDB() {
    console.log("got in");

    // var response = [{ user: '112956219092631454438', english: 'dddd', korean: 'asg',seen: 0,correct: 0,score: 9.95 },{ user: '112956219092631454438',english: 'ggg',korean: 'bysse',seen: 0,correct: 0,score: 4 } ];
    var object = [{ user: '112956219092631454438', english: 'dddd', korean: 'asg', seen: 0, correct: 0, score: 9.95 }, { user: '112956219092631454438', english: 'ggg', korean: 'bysse', seen: 0, correct: 0, score: 4 }, { user: '112956219092631454438', english: 'aaaaa', korean: 'jfjfjfj', seen: 0, correct: 0, score: 4 }];
    console.log(object[0].korean);
    this.setState({ translated: object[0].korean });
    this.setState({ responseStr: object });
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

  next() {
    var counter = this.state.counter + 1;
    var object = this.state.responseStr;
    this.setState({ translated: object[counter].korean });
    this.setState({ counter: counter });
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
      this.setState({ user: object.first });
      // event.receivedFirstWord(object.korean); //ask Jason what's the first word here? 
      console.log(object[0].korean);
    }.bind(this);
    xhr.onerror = function () {
      console.log("did not work");
    };
    xhr.send();
  }

  checkReturn(event) {
    //Checks if enter is pressed
    if (event.charCode == 13) {
      console.log("got in!")
      var object = this.state.responseStr
      var counter = this.state.counter
      if (this.state.userAnswer == object[counter].english) {
        this.setState({ displayed: "correct" });
        // this.forceUpdate();
        console.log("correct!")
        //when entered it needs to flip as well. 
      }
      else {
        var correctWord = object[counter].english;
        this.setState({ displayed: correctWord });
        console.log("false!")
        //when entered it needs to be flipped. 
      }
    }
  }

  componentDidMount() {
    this.getDB();
    this.getFirstName();
  }
  handleClick = () => {
    console.log("clicked");
    document.getElementById('foo').style.cssText = '-webkit-transform: rotateY(180deg);';
  }

  render() {
    let reviewOutput;
    reviewOutput = this.state.displayed;
    console.log(reviewOutput);
    let translation; 
    translation = this.state.translated;

    return (
      <div>
        <h1 id="logo">Lango!</h1>
        <div className="add_button"> <button onClick={this.addButton}>Add</button></div>
        <div className='card-container' onClick={this.handleClick}>
          <div className='card-body' id="foo">
            <CardBack text={reviewOutput} />

            <CardFront text={translation} />
          </div>
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
  <CardPage />,
  document.getElementById('root')
);
