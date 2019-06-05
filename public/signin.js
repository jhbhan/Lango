var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { withRouter } from 'react-router';

var SignIn = function (_React$Component) {
  _inherits(SignIn, _React$Component);

  function SignIn(props) {
    _classCallCheck(this, SignIn);

    var _this = _possibleConstructorReturn(this, (SignIn.__proto__ || Object.getPrototypeOf(SignIn)).call(this, props));

    _this.state = { value: "", changed: false, displayed: "" };

    // this.saveInput = this.saveInput.bind(this);
    // this.next = this.next.bind(this);
    // this.checkReturn = this.checkReturn.bind(this);
    _this.googleLogIn = _this.googleLogIn.bind(_this);
    //   this.startReview = this.startRewview.bind(this);
    return _this;
  }

  _createClass(SignIn, [{
    key: "googleLogIn",
    value: function googleLogIn(event) {
      //clcking this button should trigger google log in we used for the log in. 
      url = 'auth/google';
      xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = function () {
        console.log('logged in!');
      };
      xhr.onerror = function () {
        console.log('browser sees error');
      };
      xhr.send();
    }
  }, {
    key: "render",
    value: function render() {

      return React.createElement(
        "div",
        { className: "divider" },
        React.createElement(
          "div",
          { className: "opening" },
          React.createElement(
            "h1",
            { id: "Welcome" },
            "Welcome to"
          ),
          React.createElement(
            "h1",
            { id: "Lango" },
            "Lango"
          ),
          React.createElement(
            "p",
            { id: "Lango_paragraph" },
            "Customize your vocabulary"
          )
        ),
        React.createElement(
          "div",
          { className: "google_login" },
          React.createElement(
            "button",
            { onClick: this.googleLogIn },
            React.createElement(
              "div",
              null,
              React.createElement("img", { src: "google.jpg", id: "LogIn_image" }),
              React.createElement(
                "p",
                null,
                "Log in with Google"
              )
            )
          )
        )
      );
    }
  }]);

  return SignIn;
}(React.Component);

ReactDOM.render(React.createElement(SignIn, null), document.getElementById('root'));