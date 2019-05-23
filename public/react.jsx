class CardPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: ""};
    
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
    alert(this.state.value);
    this.updateOutput(this.state.value);
    }
  }
  
  save(event){
    //Checks if save button is pressed
    alert(this.state.value);
    this.updateOutput(this.state.value);
  }
  
  updateOutput(out){
    //To change what's in the output box
  }
  
  outputBox(props){
    return <textarea placeholder="Translation"/>;
  }
  

  render() {
    return (
    <div>
      <h1 id="logo">Lango!</h1>
      <div class="textcard">
        <textarea id="input" placeholder="English" onKeyPress={this.checkReturn} onChange={this.saveInput}/>
      </div>
      <div>
        <this.outputBox/>
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
