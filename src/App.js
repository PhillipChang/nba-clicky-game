import React, { Component } from 'react';
import LogoCard from "./components/LogoCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import logos from "./logo.json";
import shuffle from "shuffle-array";



class App extends Component {
  state = {
    logos,
    logosClicked: [],
    score:0,
    topScore:0,
    message:""
  };

randomize(){
  shuffle(this.state.logos);
  this.setState({ logos });
};

gameDone = () => {
  if (this.state.score > this.state.topScore) {
    console.log("this happen");
    this.setState({topScore: this.state.score});
  }
this.setState({score:0});
}

handleBtnClick = (id,name) => {
let logosClicked = this.state.logosClicked;

if (logosClicked === null){
  logosClicked = [...logosClicked, id];
  this.setState({ logosClicked : logosClicked, score:this.state.score + 1, message: "Click to start"});
}

else {
  if (logosClicked.includes(id)){
    this.setState({logosClicked: [], score: 0, message: "Good Game! You lost. Click to play again!"});
    this.gameDone();
  }

else {
  this.setState({ score: this.state.score + 1 });
  if(logosClicked.push(id)){
    this.setState({message: `You have recruited ${name}`});
  }
    if(logosClicked.length === 12) {
    this.setState({score:12,topScore:12, logosClicked:[],message: "Congrats! You win. Click to play again!"});
    this.setState({score:0});
  }
}
}
  this.randomize();
};



  render() {
    return (
      <div className="main">
      <Title message={this.state.message} score={this.state.score} topScore={this.state.topScore}></Title>
      <Wrapper>
      {this.state.logos.map(logo => (
        <LogoCard
        id={logo.id}
        key={logo.id}
        name={logo.name}
        image={logo.image}
        handleBtnClick = {this.handleBtnClick}
        />
      ))}
      </Wrapper>
      </div>
    );
  }
}

export default App;
