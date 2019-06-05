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

    _this.state = { value: "", changed: false, displayed: "" };

    _this.saveInput = _this.saveInput.bind(_this);
    _this.next = _this.next.bind(_this);
    _this.checkReturn = _this.checkReturn.bind(_this);
    //   this.startReview = this.startRewview.bind(this);
    return _this;
  }

  _createClass(CardPage, [{
    key: "saveInput",
    value: function saveInput(event) {
      //Updates value whenever textbox is changed
      this.setState({ value: event.target.value });
    }
  }, {
    key: "checkReturn",
    value: function checkReturn(event) {
      //Checks if enter is pressed
      if (event.charCode == 13) {
        this.sendTranslateRequest(this.state.value, this);
      }
    }
  }, {
    key: "next",
    value: function next(event) {
      //puts out the next button
      if (this.state.value != "" && this.state.displayed != "") {
        var eng = this.state.value;
        var kor = this.state.displayed;
        var url = "store?english=" + eng + "&korean=" + kor;
        console.log(url);

        var xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);

        xhr.onload = function () {
          console.log("next");
        };
        xhr.onerror = function () {
          console.log("did not work");
        };
        xhr.send();
      }
    }
  }, {
    key: "addButton",
    value: function addButton() {
      // this.context.router.push('/home.html');
    }
  }, {
    key: "sendTranslateRequest",
    value: function sendTranslateRequest(englishWord, card) {
      //Used to send englishWord for translation in API
      var url = "translate?english=" + englishWord;

      var xhr = new XMLHttpRequest();

      xhr.open("GET", url, true);

      xhr.onload = function () {
        var responseStr = xhr.responseText;
        var object = JSON.parse(responseStr);
        card.receivedTranslateRequest(object.Korean);
      };
      xhr.onerror = function () {
        console.log("did not work");
      };
      xhr.send();
    }
  }, {
    key: "receivedTranslateRequest",
    value: function receivedTranslateRequest(translatedWord) {
      //After response is received
      this.setState({ changed: true });
      this.setState({ displayed: translatedWord });
    }
  }, {
    key: "updateOutput",
    value: function updateOutput() {
      //To change what's in the output box
      return this.state.displayed;
    }
  }, {
    key: "render",
    value: function render() {
      var output = void 0;
      if (this.state.changed) {
        output = React.createElement("textarea", { id: "input", value: this.updateOutput(), placeholder: "Korean" });
      } else {
        output = React.createElement("textarea", { id: "input", readOnly: true, placeholder: "Korean" });
      }

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
          output
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