class CardPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: "", changed: false, displayed: ""};
    
    this.saveInput = this.saveInput.bind(this);
    this.save = this.save.bind(this);
    this.checkReturn = this.checkReturn.bind(this);
  }
  
  saveInput(event){
    //Updates value whenever textbox is changed
    this.setState({value: event.target.value});
    console.log(this.state.value);

  }
  
  checkReturn(event){
    //Checks if enter is pressed
    if(event.charCode == 13){
      this.setState({changed: true});
      alert(this.state.value);
      this.sendTranslateRequest(this.state.value);
    }
  }
  
  save(event){
    //Checks if save button is pressed
    this.setState({changed: true});
    alert(this.state.value);
    this.sendTranslateRequest(this.state.value);
  }
  
  sendTranslateRequest(englishWord){
    //Used to send englishWord for translation in API
    
    //After response is received
    this.setState({changed: true});
    this.setState({displayed: "-----TRANSLATION_RESPONSE-----"});
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
      output = <textarea id="output" placeholder="Translation"/>;
    }
  
    return (
    <div>
      <h1 id="logo">Lango!</h1>
      <div class="textcard">
        <textarea id="input" placeholder="English" onKeyPress={this.checkReturn} onChange={this.saveInput}/>
      </div>
      <div>
        {output}
      </div>
      <div class="save_button">
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
