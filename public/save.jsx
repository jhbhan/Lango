class CardPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: "", changed: false, displayed: ""};
    
    this.saveInput = this.saveInput.bind(this);
    this.save = this.save.bind(this);
    this.checkReturn = this.checkReturn.bind(this);
    //this.clearFlashcards = this.clearFlashcards.bind(this);
  }
  
  saveInput(event){
    //Updates value whenever textbox is changed
    this.setState({value: event.target.value});

  }
  
  checkReturn(event){
    //Checks if enter is pressed
    if(event.charCode == 13){
      this.sendTranslateRequest(this.state.value, this);
    }
  }
  
  save(event){
    //Saves englishWord and translatedWord to database
    if(this.state.value != "" && this.state.displayed != ""){
      let eng = this.state.value;
      let kor = this.state.displayed;

      let url = "store?english="+eng+"&korean="+kor;
      console.log(url);


      //this.clearFlashcards();
      let xhr = new XMLHttpRequest();

      xhr.open("GET", url, true);

      xhr.onload = function() {
        console.log("saved");
       };
      xhr.onerror = function() {
        console.log("did not work");
       };
      xhr.send(); 
    }
  }
/*
//Doesn't work correctly yet
  clearFlashcards(){
    this.setState({value: "", displayed: "", changed: false});
    console.log("states cleared");
    console.log(this.state.value);
    console.log(this.state.changed);
    console.log(this.state.displayed);
  }
  */
  
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
      output = <textarea id="output" value={this.updateOutput()} placeholder="Translation"/>;
    }
    else{
      output = <textarea id="output" readOnly={true} placeholder="Translation"/>;
    }
  
    return (
    <div>
      <h1 id="logo">Lango!</h1>
      <div className="textcard">
        <textarea id="input" placeholder="English" onKeyPress={this.checkReturn} onChange={this.saveInput}/>
      </div>
      <div className="textcard">
        {output}
      </div>
      <div className="save_button">
        <button onClick={this.save}>Save</button>
      </div>
    </div>
    );
  }
}



ReactDOM.render(
  <CardPage/>,
  document.getElementById('root')
);