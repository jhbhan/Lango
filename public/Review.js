var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
   This flipcard component is based on the flipcard component by
   Alex Devero, at:
   
      https://reactjsexample.com/react-flipping-card-with-tutorial/

   It was modified for ECS 162 by Nina Amenta, May 2019.
*/

var cardContainer = document.querySelector('.react-card');

// React component for form inputs

var CardInput = function (_React$Component) {
  _inherits(CardInput, _React$Component);

  function CardInput() {
    _classCallCheck(this, CardInput);

    return _possibleConstructorReturn(this, (CardInput.__proto__ || Object.getPrototypeOf(CardInput)).apply(this, arguments));
  }

  _createClass(CardInput, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'fieldset',
        null,
        React.createElement('input', { name: this.props.name, id: this.props.id, type: this.props.type || 'text', placeholder: this.props.placeholder, required: true })
      );
    }
  }]);

  return CardInput;
}(React.Component);

// React component for textarea


var CardTextarea = function (_React$Component2) {
  _inherits(CardTextarea, _React$Component2);

  function CardTextarea() {
    _classCallCheck(this, CardTextarea);

    return _possibleConstructorReturn(this, (CardTextarea.__proto__ || Object.getPrototypeOf(CardTextarea)).apply(this, arguments));
  }

  _createClass(CardTextarea, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'fieldset',
        null,
        React.createElement('textarea', { name: this.props.name, id: this.props.id, placeholder: this.props.placeholder, required: true })
      );
    }
  }]);

  return CardTextarea;
}(React.Component);

// React component for the front side of the card


var CardFront = function (_React$Component3) {
  _inherits(CardFront, _React$Component3);

  function CardFront() {
    _classCallCheck(this, CardFront);

    return _possibleConstructorReturn(this, (CardFront.__proto__ || Object.getPrototypeOf(CardFront)).apply(this, arguments));
  }

  _createClass(CardFront, [{
    key: 'render',
    value: function render(props) {
      return React.createElement(
        'div',
        { className: 'card-side side-front' },
        React.createElement(
          'div',
          { className: 'card-side-container' },
          React.createElement(
            'h2',
            { id: 'trans' },
            this.props.text
          )
        )
      );
    }
  }]);

  return CardFront;
}(React.Component);

// React component for the back side of the card


var CardBack = function (_React$Component4) {
  _inherits(CardBack, _React$Component4);

  function CardBack() {
    _classCallCheck(this, CardBack);

    return _possibleConstructorReturn(this, (CardBack.__proto__ || Object.getPrototypeOf(CardBack)).apply(this, arguments));
  }

  _createClass(CardBack, [{
    key: 'render',
    value: function render(props) {
      return React.createElement(
        'div',
        { className: 'card-side side-back' },
        React.createElement(
          'div',
          { className: 'card-side-container' },
          React.createElement(
            'h2',
            { id: 'congrats' },
            this.props.text
          )
        )
      );
    }
  }]);

  return CardBack;
}(React.Component);

// React component for the card (main component)


var Card = function (_React$Component5) {
  _inherits(Card, _React$Component5);

  function Card(props) {
    _classCallCheck(this, Card);

    var _this5 = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

    _this5.state = { userAnswer: "", output: "No Answer", correct: "false", displayed: "", numCorrect: 0, firstWord: true, userName: "" };

    _this5.saveInput = _this5.saveInput.bind(_this5);
    _this5.checkReturn = _this5.checkReturn.bind(_this5);
    _this5.getDB = _this5.getDB.bind(_this5);
    _this5.getFirstName = _this5.getFirstName(_this5);
    // this.receivedFirstWord = this.receivedFirstWord.bind(this);
    // this.getDB = this.getDB.bind(this);
    // this.sendTranslateRequest = this.sendTranslateRequest.bind(this);
    //   this.startReview = this.startRewview.bind(this);
    return _this5;
  }

  _createClass(Card, [{
    key: 'getDB',
    value: function getDB() {
      console.log("got in");
      //intialize the output in the beginnning. 
      var url = '/getDB';

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
  }, {
    key: 'getFirstName',
    value: function getFirstName() {
      console.log("got in");
      //intialize the output in the beginnning. 
      var url = '/getName';
      var xhr = new XMLHttpRequest();

      xhr.open("GET", url, true);

      xhr.onload = function () {
        console.log("when loaded");
        var responseStr = xhr.responseText;
        var object = JSON.parse(responseStr);
        this.setState({ userName: object[0].first });
        // event.receivedFirstWord(object.korean); //ask Jason what's the first word here? 
        // console.log(object[0].korean);
      };
      xhr.onerror = function () {
        console.log("did not work");
      };
      xhr.send();
    }
  }, {
    key: 'checkReturn',
    value: function checkReturn(event) {
      if (event.charCode == 13) {
        console.log("got in!");
        if (this.state.userAnswer == "Volare") {
          this.setState({ correct: "true" });
          // this.forceUpdate();
          console.log("correct!");
        } else {
          this.setState({ output: "false" });
          this.setState({ correct: "false" });
          console.log("false!");
        }
        //flip the card above. 
        // if correct then CORRECT GREEN
        // if wrong then the correct english transaltion. 
      }
    }
  }, {
    key: 'saveInput',
    value: function saveInput(event) {
      this.setState({ userAnswer: event.target.value });
    }
  }, {
    key: 'updateOutput',
    value: function updateOutput() {
      //To change what's in the output box
      return this.state.output;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getDB();
      this.getFirstName();
    }
  }, {
    key: 'render',
    value: function render() {
      console.log("rendered");
      var output = void 0;
      if (this.state.correct == "true") {
        console.log("hi");
        // output = <textarea id="correct!" text={this.updateOutput()}/>;
        output = "correct";
      } else {
        console.log("bye");
        output = "nothing";
      }

      var translation = void 0;
      translation = this.state.displayed; //first word to display on the screen. 
      var userID = void 0;
      userID = this.state.user;
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'card-container' },
          React.createElement(
            'div',
            { className: 'card-body' },
            React.createElement(CardBack, { text: output }),
            React.createElement(CardFront, { text: translation })
          )
        ),
        React.createElement(
          'div',
          { className: 'textcard' },
          React.createElement('textarea', { id: 'output', placeholder: 'Translate the word above to English', onKeyPress: this.checkReturn, onChange: this.saveInput })
        ),
        React.createElement(
          'div',
          null,
          user
        )
      );
    }
  }]);

  return Card;
}(React.Component);

// Render Card component


ReactDOM.render(React.createElement(Card, null), cardContainer);