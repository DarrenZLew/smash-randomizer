import React, { Component } from 'react';
import './App.css';
import { fetchSmashUpData } from './utils/api';
import NavbarInstance from './components/Header';
import RandomizePage from './components/RandomizePage';
import FormSettings from './components/FormSettings';
import Sets from './components/Sets';
import FactionsPage from './components/FactionsPage';
import HistoryPage from './components/HistoryPage';
import { Route, Switch } from 'react-router-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smashUpdata: null,
      selectedFactions: null,
      factionNumber: '2',
      playerNumber: '2',
      PlayerFactions: {},
      results: false,
      showSettings: false,
      history: {
        checked: false,
        logArray: []
      },
      showAlert: false,
      totalFactionsNum: 0
    }

    this.handleRandomize = this.handleRandomize.bind(this);
    this.handleReturnEditSettings = this.handleReturnEditSettings.bind(this);
    this.handleToggleFaction = this.handleToggleFaction.bind(this);
    this.handleSubmitHistory = this.handleSubmitHistory.bind(this);
    this.closeSettings = this.closeSettings.bind(this);
    this.openSettings = this.openSettings.bind(this);
    this.selectPlayerNumber = this.selectPlayerNumber.bind(this);
    this.selectFactionNumber = this.selectFactionNumber.bind(this);
    this.toggleSet = this.toggleSet.bind(this);
  }

  toggleSet(set,index) {
    let remainingFactions = Object.assign({}, this.state.selectedFactions)
    let data = this.state.smashUpdata
    data[index].checked = !data[index].checked
    set.factions.map(faction => {
      if (data[index].checked && !remainingFactions.hasOwnProperty(faction.title)) {
        return remainingFactions[faction.title] = faction.title;
      } else if (!data[index].checked && remainingFactions.hasOwnProperty(faction.title)) {
        return delete remainingFactions[faction.title]
      }
      return remainingFactions  
    })
    
    this.setState({ 
      smashUpdata: data, 
      selectedFactions: remainingFactions
    })
  }
  
  selectPlayerNumber(player) {
    this.setState({ playerNumber: player.target.value })
  }

  selectFactionNumber(number) {
    this.setState({ factionNumber: number.target.value })
  }

  closeSettings() {
    this.setState({ showSettings: false })
  }

  openSettings() {
    this.setState({ 
      showSettings: true,
      showAlert: false
    })
  }

  handleRandomize() {
    const selectedFactionsArr = Object.keys(this.state.selectedFactions);
    if (selectedFactionsArr.length >= parseInt(this.state.playerNumber, 10) * this.state.factionNumber) {
      const remainingFactions = selectedFactionsArr.map(function(faction) {
        return faction 
      });
      let factions = [];
      let allPlayerFactions = {};
      let allPlayerFactionIds = [];
      let allPlayerIds = [];
      let factionId = 1;
      let playerId = 1;
        for (let i = 1; i <= this.state.playerNumber; i++) {
          let playerFactions = [];
          for (let j = 0; j < parseInt(this.state.factionNumber, 10); j++) {
            const index = Math.floor(Math.random() * remainingFactions.length);
            playerFactions.push(remainingFactions[index]);
            allPlayerFactionIds.push('faction' + factionId);
            factionId++;
            remainingFactions.splice(index, 1);
          }
          allPlayerIds.push('Player ' + playerId);
          playerId++;
          factions.push(playerFactions);
        }
        allPlayerFactions.factions = factions;
        allPlayerFactions.factionIds = allPlayerFactionIds;
        allPlayerFactions.playerIds = allPlayerIds;
      this.setState((previousState) => {
        previousState.playerFactions = allPlayerFactions
        previousState.results = true
        previousState.history.checked = false
        previousState.showAlert = false
        return previousState
      })
    }
    else {
      this.setState({
        showAlert: true
      })
    }
  }

  handleReturnEditSettings() {
    this.setState({
      results: false,
    })
  }

  handleSubmitHistory() {
    let history = Object.assign({}, this.state.history)
    if (!history.checked) {
      const currentHistory = {
        playerFactions: this.state.playerFactions,
        factionNumber: this.state.factionNumber,
        playerNumber: this.state.playerNumber,
        selectedFactions: this.state.selectedFactions
      }
      this.setState(previousState => {
        previousState.history.checked = true
        previousState.history.logArray = [...previousState.history.logArray, currentHistory]
        return previousState
      })
    }
  }

  handleToggleFaction(faction,setIndex) {
    let remainingFactions = Object.assign({}, this.state.selectedFactions)
    if (this.state.smashUpdata[setIndex].checked) {
      remainingFactions.hasOwnProperty(faction) ? delete remainingFactions[faction] : remainingFactions[faction] = faction; 
      this.setState({
        selectedFactions: remainingFactions,
        showAlert: false
      })    
    }
  }


  componentDidMount() {
    const data = fetchSmashUpData()
    this.setState({
      smashUpdata: data.sets,
      selectedFactions: data.selectFacObj,
      totalFactionsNum: data.selectFacArr.length 
    })
  }

  render() {
    return (
      <div>      
        <div className="container">
          <NavbarInstance />
          <FormSettings
            smashUpData={this.state.smashUpdata} 
            selectedPlayer={this.state.playerNumber} 
            factionNumber={this.state.factionNumber} 
            handleToggleSet={this.toggleSet} 
            handlePlayerNumber={this.selectPlayerNumber} 
            handleFactionNumber={this.selectFactionNumber} 
            showSettings={this.state.showSettings} 
            close={this.closeSettings} 
          /> 
            {this.state.smashUpdata === null
            ? <h1>Loading</h1>
            : <Switch>
                <Route exact path="/" render={() => <RandomizePage 
                                                    smashUpData={this.state.smashUpdata} 
                                                    selectedFactions={this.state.selectedFactions} 
                                                    handleToggleFaction={this.handleToggleFaction}
                                                    handleRandomize={this.handleRandomize}
                                                    openSettings={this.openSettings}
                                                    results={this.state.results}
                                                    playerFactions={this.state.playerFactions}
                                                    playerNumber={this.state.playerNumber}
                                                    factionNumber={this.state.factionNumber}
                                                    handleReturnEditSettings={this.handleReturnEditSettings}
                                                    handleSubmitHistory={this.handleSubmitHistory}
                                                    history={this.state.history}
                                                    showAlert={this.state.showAlert}
                                                  />}

              />

              <Route exact path="/sets" render={({match}) => <Sets
                                                        match={match}
                                                        smashUpData={this.state.smashUpdata}
                                                        />} 
              />
              <Route path="/sets/:set/:faction" render={({match}) => <FactionsPage
                                                        match={match}
                                                        smashUpData={this.state.smashUpdata}
                                                        />}
              />
              <Route path="/history" render={() => <HistoryPage 
                                                   history={this.state.history}  
                                                   totalFactionsNum={this.state.totalFactionsNum}     
                                                  />} 
              />
            </Switch>}
        </div>
      </div>
    );
  }
}