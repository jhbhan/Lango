var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { withRouter } from 'react-router';

var CardPage = function (_React$Component) {
  _inherits(CardPage, _React$Component);

  function CardPage(props) {
    _classCallCheck(this, CardPage);

    var _this = _possibleConstructorReturn(this, (CardPage.__proto__ || Object.getPrototypeOf(CardPage)).call(this, props));

    _this.state = { userAnswer: "", seen: 0, changed: false, displayed: "", numCorrect: 0, correct: false, firstWord: true, counter: 0, responseStr: "" };

    _this.saveInput = _this.saveInput.bind(_this);
    _this.checkReturn = _this.checkReturn.bind(_this);
    // this.receivedFirstWord = this.receivedFirstWord.bind(this);
    _this.getDB = _this.getDB.bind(_this);
    _this.next = _this.next.bind(_this);
    // this.next = this.next.bind(this);
    // this.setDisplay = this.setDisplay(this);
    // this.sendTranslateRequest = this.sendTranslateRequest.bind(this);
    //   this.startReview = this.startRewview.bind(this);
    return _this;
  }

  _createClass(CardPage, [{
    key: "saveInput",
    value: function saveInput(event) {
      //Updates value whenever textbox is changed
      this.setState({ userAnswer: event.target.value });
    }
  }, {
    key: "getDB",
    value: function getDB() {
      console.log("got in");

      // var response = [{ user: '112956219092631454438', english: 'dddd', korean: 'asg',seen: 0,correct: 0,score: 9.95 },{ user: '112956219092631454438',english: 'ggg',korean: 'bysse',seen: 0,correct: 0,score: 4 } ];
      var object = [{ user: '112956219092631454438', english: 'dddd', korean: 'asg', seen: 0, correct: 0, score: 9.95 }, { user: '112956219092631454438', english: 'ggg', korean: 'bysse', seen: 0, correct: 0, score: 4 }, { user: '112956219092631454438', english: 'aaaaa', korean: 'jfjfjfj', seen: 0, correct: 0, score: 4 }];
      console.log(object[0].korean);
      this.setState({ displayed: object[0].korean });
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
  }, {
    key: "next",
    value: function next() {
      var counter = this.state.counter + 1;
      var object = this.state.responseStr;
      this.setState({ displayed: object[counter].korean });
      this.setState({ counter: counter });
    }
  }, {
    key: "getFirstName",
    value: function getFirstName() {
      console.log("got in2");
      //intialize the output in the beginnning. 
      var url = '/getName';

      var xhr = new XMLHttpRequest();

      xhr.open("GET", url, true);

      xhr.onload = function () {
        console.log("when loaded");
        var responseStr = xhr.responseText;
        var object = JSON.parse(responseStr);
        this.setState({ displayed: object.first });
        // event.receivedFirstWord(object.korean); //ask Jason what's the first word here? 
        console.log(object[0].korean);
      }.bind(this);
      xhr.onerror = function () {
        console.log("did not work");
      };
      xhr.send();
    }

    // setDisplay(counter, objectStr){
    //   console.log("hi");
    //   var object = JSON.parse(objectStr);
    //   this.setState({display: object[counter].korean});
    // }

    // next(){
    //   var newCounter = this.state.counter + 1; 
    //   setDisplay(newCounter,this.state.responseStr);
    //   this.setState({counter: newCounter});
    // }
    // receivedFirstWord(WordToDispplay) {
    //   this.setState({ firstWord: false });
    //   this.setState({ displayed: WordToDispplay });
    // }

  }, {
    key: "checkReturn",
    value: function checkReturn(event) {
      //Checks if enter is pressed
      if (event.charCode == 13) {
        this.sendTranslateRequest(this.state.value, this);
        //flip the card above. 
        // if correct then CORRECT GREEN
        // if wrong then the correct english transaltion. 
      }
    }
  }, {
    key: "receivedTranslateRequest",
    value: function receivedTranslateRequest(translatedWord) {
      //After response is received
      this.setState({ changed: true });
      this.setState({ displayed: translatedWord });
    }
  }, {
    key: "checkReturn",
    value: function checkReturn(event) {
      if (event.charCode == 13) {
        this.sendCheckRequest(this.state.userAnswer, this.state.numCorrect, this.state.correct);
        //flip the card above. 
        // if correct then CORRECT GREEN
        // if wrong then the correct english transaltion. 
      }
    }
  }, {
    key: "updateOutput",
    value: function updateOutput() {
      //To change what's in the output box
      return this.state.displayed;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getDB();
      this.getFirstName();
      // console.log("incomponent");
      // console.log(this.state.counter);
      // console.log(this.state.responseStr);
      // this.setDisplay(this.state.counter, this.state.responseStr);
    }
  }, {
    key: "render",
    value: function render() {
      var reviewOutput = void 0;
      // this.getDB();
      reviewOutput = this.state.displayed;
      console.log(reviewOutput);
      // <textarea id="input" value={this.state.displayed} placeholder="Korean" />; //first word to display on the screen. 
      // }
      // else {
      //     reviewOutput = <textarea id="input" readOnly={true} placeholder="Korean" />; 
      // }

      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          { id: "logo" },
          "Lango!"
        ),
        React.createElement(
          "div",
          { className: "add_button" },
          " ",
          React.createElement(
            "button",
            { onClick: this.addButton },
            "Add"
          )
        ),
        React.createElement(
          "div",
          { className: "textcard" },
          reviewOutput
        ),
        React.createElement(
          "div",
          { className: "textcard" },
          React.createElement("textarea", { id: "output", placeholder: "Translate the word above to English", onKeyPress: this.checkReturn, onChange: this.saveInput })
        ),
        React.createElement(
          "div",
          { className: "next_button" },
          React.createElement(
            "button",
            { onClick: this.next },
            "Next"
          )
        )
      );
    }
  }]);

  return CardPage;
}(React.Component);

ReactDOM.render(React.createElement(CardPage, null), document.getElementById('root'));