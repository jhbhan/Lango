// import { withRouter } from 'react-router';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", changed: false, displayed: "" };

    // this.saveInput = this.saveInput.bind(this);
    // this.next = this.next.bind(this);
    // this.checkReturn = this.checkReturn.bind(this);
    this.googleLogIn = this.googleLogIn.bind(this);
    //   this.startReview = this.startRewview.bind(this);
  }

  googleLogIn(event) {
    //clcking this button should trigger google log in we used for the log in. 
  }


  render() {

    return (
      <div className = "divider">
        <div className="opening">
          <h1 id="Welcome">Welcome to</h1>
          <h1 id="Lango">Lango</h1>
          <p id ="Lango_paragraph">Customize your vocabulary</p>
        </div>
        <div className="google_login">
          <button onClick={this.googleLogIn}><div><img src="google.jpg" id= "LogIn_image"></img><p>Log in with Google</p></div></button></div>
      </div>
    );
  }
}



ReactDOM.render(
  <SignIn />,
  document.getElementById('root')
);
