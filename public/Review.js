var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { withRouter } from 'react-router';
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

var CardPage = function (_React$Component5) {
  _inherits(CardPage, _React$Component5);

  function CardPage(props) {
    _classCallCheck(this, CardPage);

    var _this5 = _possibleConstructorReturn(this, (CardPage.__proto__ || Object.getPrototypeOf(CardPage)).call(this, props));

    _this5.handleClick = function () {
      console.log("clicked");
      document.getElementById('foo').style.cssText = '-webkit-transform: rotateY(180deg);';
      _this5.setState({ flipped: "true" });
    };

    _this5.state = { userAnswer: "", seen: 0, changed: false, displayed: "", numCorrect: 0, correct: false, firstWord: true, counter: 0, responseStr: "", translated: "", flipped: "false" };

    _this5.saveInput = _this5.saveInput.bind(_this5);
    _this5.checkReturn = _this5.checkReturn.bind(_this5);
    // this.receivedFirstWord = this.receivedFirstWord.bind(this);
    _this5.getDB = _this5.getDB.bind(_this5);
    _this5.next = _this5.next.bind(_this5);
    _this5.handleClick = _this5.handleClick.bind(_this5);
    _this5.addButton = _this5.addButton.bind(_this5);
    return _this5;
  }

  _createClass(CardPage, [{
    key: 'saveInput',
    value: function saveInput(event) {
      //Updates value whenever textbox is changed
      this.setState({ userAnswer: event.target.value });
    }
  }, {
    key: 'getDB',
    value: function getDB() {
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
  }, {
    key: 'next',
    value: function next() {
      var counter = this.state.counter + 1;
      var object = this.state.responseStr;
      this.setState({ translated: object[counter].korean });
      this.setState({ userAnswer: "" });
      this.setState({ counter: counter });
      document.getElementById('output').value = "";
      if (this.state.flipped == "true") {
        document.getElementById('foo').style.cssText = '-webkit-transform: rotateY(0deg);';
        this.setState({ flipped: "false" });
      }
    }
  }, {
    key: 'getFirstName',
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
        this.setState({ user: object.first });
        // event.receivedFirstWord(object.korean); //ask Jason what's the first word here? 
        console.log(object[0].korean);
      }.bind(this);
      xhr.onerror = function () {
        console.log("did not work");
      };
      xhr.send();
    }
  }, {
    key: 'checkReturn',
    value: function checkReturn(event) {
      //Checks if enter is pressed
      if (event.charCode == 13) {
        console.log("got in!");
        var object = this.state.responseStr;
        var counter = this.state.counter;
        if (this.state.userAnswer == object[counter].english) {
          this.setState({ displayed: "correct" });
          // this.forceUpdate();
          console.log("correct!");
          //when entered it needs to flip as well. 
        } else {
          var correctWord = object[counter].english;
          this.setState({ displayed: correctWord });
          console.log("false!");
          //when entered it needs to be flipped. 
        }
        document.getElementById('foo').style.cssText = '-webkit-transform: rotateY(180deg);';
        this.setState({ flipped: "true" });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getDB();
      this.getFirstName();
    }
  }, {
    key: 'addButton',
    value: function addButton() {
      console.log("add clicked");
      window.location.href = 'save.html';
    }
  }, {
    key: 'render',
    value: function render() {
      var reviewOutput = void 0;
      reviewOutput = this.state.displayed;
      console.log(reviewOutput);
      var translation = void 0;
      translation = this.state.translated;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          { id: 'logo' },
          'Lango!'
        ),
        React.createElement(
          'div',
          { className: 'add_button' },
          ' ',
          React.createElement(
            'button',
            { onClick: this.addButton },
            'Add'
          )
        ),
        React.createElement(
          'div',
          { className: 'card-container', onClick: this.handleClick },
          React.createElement(
            'div',
            { className: 'card-body', id: 'foo' },
            React.createElement(CardBack, { text: reviewOutput }),
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
          { className: 'next_button' },
          React.createElement(
            'button',
            { onClick: this.next },
            'Next'
          )
        )
      );
    }
  }]);

  return CardPage;
}(React.Component);

ReactDOM.render(React.createElement(CardPage, null), document.getElementById('root'));