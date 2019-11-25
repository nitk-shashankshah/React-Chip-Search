import React from 'react';

import './App.css';

class App extends React.Component {
  constructor() {
     super();
     this.state = {
        list:
        [
           {
              "name":"John"
           },
           {
              "name":"Lillian"
           },
           {
              "name":"Alice"            
           },
           {
              "name":"Matthew"            
           },
           {
              "name":"Mark"            
           }
        ],
        selectedList:[],
        searchStr:"",
        lastSelected:0,
        counter:0
     }
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

  }

  handleClick(i, itm) {
    var selectedList = this.state.selectedList.slice();
    var list = this.state.list.slice();
    if (selectedList.indexOf(itm)<0){
      selectedList.push(itm);
      list.splice(i,1);
    }

    this.setState({list: list});
    this.setState({selectedList: selectedList});
  }

  handleChange = (e) => {
    this.setState({searchStr: e.target.value});
    this.setState({lastSelected:0});
  }

  handleKeyUp = (e) => {
    if (e.key === "Backspace") {
      if (this.state.lastSelected===1){
        if (this.state.selectedList!==undefined && this.state.selectedList.length>0)
          this.removeItem(this.state.selectedList.length-1, this.state.selectedList[this.state.selectedList.length-1]);
        this.setState({lastSelected:0});
      } else {
        this.setState({lastSelected:this.state.lastSelected+1});
      } 
    }    
  }

  removeItem(i,itm){
    var selectedList = this.state.selectedList.slice();
    var list = this.state.list.slice();
    selectedList.splice(i,1);
    list.push(itm);
    this.setState({list: list});
    this.setState({selectedList: selectedList});
  }

  render() {
     return (
        <div style={{padding:"10px"}}>
          <Header/>
          <ul class="selectedItems">
          {this.state.selectedList.map((person, i) => <Chip data = {person} onClick={() => this.removeItem(i, person)} isSelected={this.state.lastSelected} isLast={(i===this.state.selectedList.length-1)? true:false} />)}
          </ul>          
          <div style={{float:"left"}}>
            <input type="text" class="search" value={this.state.searchStr} onKeyUp={this.handleKeyUp} onChange={this.handleChange} />
            <ul class="filterList">
              {this.state.list.map((person, i) => <ListRow startsWith={this.state.searchStr} key={i} data = {person} onClick={() => this.handleClick(i, person)} />)}
            </ul>
          </div>
        </div>
     );
  }
}
class Header extends React.Component {
  render() {
     return (
        <div>
           <h1>Chip Search</h1>
        </div>
     );
  }
}
class ListRow extends React.Component {
  render() {
    if (this.props.data.name.toString().toLowerCase().indexOf(this.props.startsWith.toString().toLowerCase())===0) {
      return (
        <li onClick={() => this.props.onClick()}>{this.props.data.name}</li>          
      );
    } else {
      return null;
    }
  }
}
class Chip extends React.Component {
  render() {
    if (!this.props.isLast) {
     return (
       <li><button class="remove" onClick={() => this.props.onClick()}>x</button> {this.props.data.name}</li>          
     );
    } else if (this.props.isLast && this.props.isSelected===1){
      return (
        <li style={{border:"1px solid green"}}><button class="remove" onClick={() => this.props.onClick()}>x</button> {this.props.data.name}</li>          
      );
    } else {
      return (
        <li><button class="remove" onClick={() => this.props.onClick()}>x</button> {this.props.data.name}</li>          
      );
    }
  }
}
export default App;