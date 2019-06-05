// import { withRouter } from 'react-router';

class CardPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: "", changed: false, displayed: ""};
    
    this.saveInput = this.saveInput.bind(this);
    this.next = this.next.bind(this);
    this.checkReturn = this.checkReturn.bind(this);
  //   this.startReview = this.startRewview.bind(this);
  }
  
  saveInput(event){
    //Updates value whenever textbox is changed
    this.setState({value: event.target.value});

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
  
  next(event){
    //puts out the next button
    if(this.state.value != "" && this.state.displayed != ""){
      let eng = this.state.value;
      let kor = this.state.displayed;
      let url = "store?english="+eng+"&korean="+kor;
      console.log(url);

      let xhr = new XMLHttpRequest();

      xhr.open("GET", url, true);

      xhr.onload = function() {
        console.log("next");
       };
      xhr.onerror = function() {
        console.log("did not work");
       };
      xhr.send(); 
    }
  }

  addButton(){
    // this.context.router.push('/home.html');
  }
  
  sendTranslateRequest(englishWord, card){
    //Used to send englishWord for translation in API
    let url = "translate?english="+englishWord;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onload = function() {
      let responseStr = xhr.responseText;
      let object = JSON.parse(responseStr);
      card.receivedTranslateRequest(object.Korean);
     };
     xhr.onerror = function() {
      console.log("did not work");
     };
    xhr.send(); 
  }
  
  receivedTranslateRequest(translatedWord){
    //After response is received
    this.setState({changed: true});
    this.setState({displayed: translatedWord});
  }
  
  updateOutput(){
    //To change what's in the output box
    return this.state.displayed;
  }

  render() {
    let output;
    if(this.state.changed){
      output = <textarea id="input" value={this.updateOutput()} placeholder="Korean"/>;
    }
    else{
      output = <textarea id="input" readOnly={true} placeholder="Korean"/>;
    }
  
    return (
    <div>
      <h1 id="logo">Lango!</h1>
      <div className ="add_button"> <button onClick = {this.addButton}>Add</button></div>
      <div className="textcard">
        {output}
      </div>
      <div className="textcard">
        <textarea id="output" placeholder="Translate the word above to English" onKeyPress={this.checkReturn} onChange={this.saveInput}/>
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
