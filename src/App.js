import React, { Component } from 'react';
import './App.css';
import { fetchSmashUpData } from './utils/api';
import NavbarInstance from './components/Header';
import RandomizePage from './components/RandomizePage';
import FormSettings from './components/FormSettings';
import Sets from './components/Sets';
import FactionsPage from './components/FactionsPage';
import HistoryPage from './components/HistoryPage';
import QueensberryPage from './components/QueensberryPage';
import { Route, Switch } from 'react-router-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smashUpdata: null,
      selectedFactions: null,
      factionNumber: '2',
      playerNumber: '2',
      playerFactions: {},
      results: false,
      showSettings: false,
      historyCheckRandomizer: false,
      historyCheckQueensberry: false,
      historyLogArray: [],
      showAlert: false,
      totalFactionsNum: 0,
      factionResults: false,

      selectedFactionsQ: [],
      selectedFactionsResetQ: [],
      deselectedFactionsQ: [],
      selectedFactionQ: {},
      factionsQ: [],
      submitFactionsQ: false,
      playerNumberQ: '2',
      factionNumberQ: 2,
      factionPoolQ: '8',
      randomizePoolQ: 'no',
      currentPlayerQ: {
        player: 1, 
        direction: 'up'
      },
      playerFactionsQ: [],
      settingsQ: true     
    }
  }

  toggleSet = (set,index) => {
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
  
  selectPlayerNumber = (player) => {
    this.setState({ playerNumber: player.target.value })
  }

  selectFactionNumber = (number) => {
    this.setState({ factionNumber: number.target.value })
  }

  closeSettings = () => {
    this.setState({ showSettings: false })
  }

  openSettings = () => {
    this.setState({ 
      showSettings: true,
      showAlert: false
    })
  }

  handleRandomize = () => {
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
      this.setState({
        playerFactions: allPlayerFactions,
        results: true,
        historyCheckRandomizer: false,
        showAlert: false,
      })
    }
    else {
      this.setState({
        showAlert: true
      })
    }
  }

  handleReturnEditSettings = () => {
    this.setState({ results: false })
  }

  handleSubmitHistory = (mode, playerFactions, factionNumber, playerNumber) => {
    let historyLogArray = this.state.historyLogArray.slice()
    let currentHistory = {}
    if (!this.state.historyCheckRandomizer) {
      currentHistory = {
        playerFactions: this.state.playerFactions,
        factionNumber: this.state.factionNumber,
        playerNumber: this.state.playerNumber,
        selectedFactions: this.state.selectedFactions,
        mode: "Randomizer",
        randomized: null,
        factionPool: null
      }
      this.setState({historyCheckRandomizer: true})
    }        
    if (!this.state.historyCheckQueensberry && mode === "Queensberry") {
      let playerFactionsHistory = {}
      let playerIds = []
      let factionIdsNum = 0
      let factionIds = []
      let factions = []
      factions = playerFactions.map((e,index) => {
        playerIds.push("Player " + (index + 1))
        factionIdsNum += e.faction.length
        return(e.faction)
      })
      for (let i = 0; i < factionIdsNum; i++) {
        factionIds.push("faction" + (i + 1))
      }
      playerFactionsHistory = {
        factions: factions,
        playerIds: playerIds,
        factionIds: factionIds
      }
      const randomized = this.state.randomizePoolQ === 'yes' ? 'Yes' : 'No'
      const factionPool = this.state.selectedFactionsResetQ.map(faction => faction.name)
      currentHistory = {
        playerFactions: playerFactionsHistory,
        factionNumber: factionNumber,
        playerNumber: playerNumber,
        selectedFactions: null,
        mode: "Queensberry",
        randomized: randomized,
        factionPoolNumber: this.state.factionPoolQ,
        factionPool: factionPool
      }
      this.setState({historyCheckQueensberry: true})
    }
    if (Object.keys(currentHistory).length !== 0 && currentHistory.constructor === Object) {
      historyLogArray.push(currentHistory)
      this.setState({historyLogArray: historyLogArray})
    } 
    
  }

  handleToggleFaction = (faction,setIndex) => {
    let remainingFactions = Object.assign({}, this.state.selectedFactions)
    if (this.state.smashUpdata[setIndex].checked) {
      remainingFactions.hasOwnProperty(faction) ? delete remainingFactions[faction] : remainingFactions[faction] = faction; 
      this.setState({
        selectedFactions: remainingFactions,
        showAlert: false
      })    
    }
  }

  handleHistoryCheckQueensberry = () => {
    this.setState({
      historyCheckQueensberry: false,
      factionResults: false
    }) 
  }

  resetPlayerFactions() {
    let playerFactions = this.state.playerFactionsQ.slice()
    for (let i = 0; i < this.state.playerNumberQ; i++) {
      let currentPlayer = i + 1
      const obj = {faction: ['', ''], player: currentPlayer}
      playerFactions[i] = obj
    }
    return playerFactions
  }

  handleSubmitSelection = () => {
    if (this.state.selectedFactionsQ.length >= this.state.factionPoolQ) {
      const playerFactions = this.resetPlayerFactions()
      if (this.state.randomizePoolQ === 'yes') {
        let selectedFactionsPool = this.state.selectedFactionsQ.slice()
        let selectedFactions = []
        for (let i = 0; i < this.state.factionPoolQ; i++) {
          const index = Math.floor(Math.random()*selectedFactionsPool.length)
          selectedFactions = selectedFactions.concat(selectedFactionsPool.splice(index, 1))
        }
        this.setState({
          selectedFactionsQ: selectedFactions,
          selectedFactionsResetQ: selectedFactions
        })
      }
      this.setState({
        submitFactionsQ: true,
        playerFactionsQ: playerFactions 
      })
    }
  }

  handleDeselect = (index, option) => {
    let selectedFactionsQ = this.state.selectedFactionsQ.slice()
    let deselectedFactionsQ = this.state.deselectedFactionsQ.slice()
    if (option === 'select') {
      deselectedFactionsQ = deselectedFactionsQ.concat(selectedFactionsQ.splice(index, 1))      
    } else if (option === 'deselect') {
      selectedFactionsQ = selectedFactionsQ.concat(deselectedFactionsQ.splice(deselectedFactionsQ.length - 1, 1))
    }    
    this.setState({
      selectedFactionsQ: selectedFactionsQ, 
      deselectedFactionsQ: deselectedFactionsQ
    })
  }

  handleSelectionChange = selectedFactionsQ => {
    if ((selectedFactionsQ.length <= this.state.factionPoolQ && this.state.randomizePoolQ === 'no') || this.state.randomizePoolQ === 'yes') {
      this.setState({selectedFactionsQ: selectedFactionsQ, selectedFactionsResetQ: selectedFactionsQ})     
    }
  }

  handleClearSelection = () => this.setState({selectedFactionsQ: []})

  handlePlayerFactionSelection = (selectedFaction, index) => {
    const faction = {faction: selectedFaction.target.value, index: index}
    this.setState({selectedFactionQ: faction})
  }

  handlePlayerFactionSelectionSubmit = (option) => {
    function snakeFactionsLogicSelect(currentPlayer, playerNumber) {
      if (currentPlayer.player === playerNumber && currentPlayer.direction !== 'reverse') {
        currentPlayer.direction = 'reverse'
      } else if (currentPlayer.direction === 'reverse') {
        currentPlayer.direction = 'down'
      }

      if (currentPlayer.direction === 'up') {
        currentPlayer.player++
      } else if (currentPlayer.direction === 'down') {
        currentPlayer.player--
      }
      return currentPlayer
    }
    function snakeFactionsLogicDeselect(currentPlayer, playerNumber) {
      if (currentPlayer.direction === 'up') {
        currentPlayer.player--
      } else if (currentPlayer.direction === 'down') {
        currentPlayer.player++
      }

      if (currentPlayer.player === playerNumber && currentPlayer.direction !== 'reverse') {
        currentPlayer.direction = 'reverse'
      } else if (currentPlayer.direction === 'reverse') {
        currentPlayer.direction = 'up'
      }
      return currentPlayer
    } 

    let currentPlayer = Object.assign({}, this.state.currentPlayerQ)
    let playerFactions = this.state.playerFactionsQ.slice()
    if (option === 'select') {
      const index = currentPlayer.player - 1 
      const playerFaction = Object.assign({}, this.state.selectedFactionQ)
      if (index >= 0 && playerFactions[index].faction.indexOf('') !== -1 && Object.keys(playerFaction).length !== 0) {
        playerFactions[index].faction.splice(playerFactions[index].faction.indexOf(''),1,playerFaction.faction)
        this.handleDeselect(playerFaction.index, 'select')
        currentPlayer = snakeFactionsLogicSelect(currentPlayer, parseInt(this.state.playerNumberQ, 10))
        this.setState({
          playerFactionsQ: playerFactions,
          currentPlayerQ: currentPlayer,
          selectedFactionQ: {},
        })    
      }
    } else if (option === 'deselect') {
      currentPlayer = snakeFactionsLogicDeselect(currentPlayer, parseInt(this.state.playerNumberQ, 10))
      const index = currentPlayer.player - 1
      if (playerFactions[this.state.playerNumberQ - 1].faction[1] !== '') {
        this.handleHistoryCheckQueensberry()
      }
      if (playerFactions[0].faction[0] !== '') {
        const factionIndex = playerFactions[index].faction.lastIndexOf('') !== -1 ? playerFactions[index].faction.lastIndexOf('') - 1 : playerFactions[index].faction.length - 1
        playerFactions[index].faction.splice(factionIndex,1,'')
        this.handleDeselect(null, 'deselect')
        this.setState({
          playerFactionsQ: playerFactions,
          currentPlayerQ: currentPlayer,
          selectedFactionQ: {},
        })        
      }    
    }
    const factionResults = playerFactions[0].faction.indexOf('') === -1 ? true : false
    this.setState({factionResults})
  }

  handleRevertAllPlayerFactionSelections = () => {
    const playerFactions = this.resetPlayerFactions()
    this.handleHistoryCheckQueensberry()
    this.setState({
      selectedFactionsQ: this.state.selectedFactionsResetQ,
      selectedFactionQ: {},
      playerFactionsQ: playerFactions,
      submitFactionsQ: true,
      currentPlayerQ: {
        player: 1, 
        direction: 'up'
      }   
    })
  }

  handleToggleSettings = () => {
    let settings = this.state.settingsQ
    if (!settings) {
      this.handleHistoryCheckQueensberry()
      this.setState({
        selectedFactionsQ: [],
        selectedFactionQ: {},
        currentPlayerQ: {
          player: 1, 
          direction: 'up'
        },        
        playerFactionsQ: [],
        submitFactionsQ: false,                      
      })
    }
    settings = !settings
    this.setState({settingsQ: settings})
  }

  selectPlayerNumberQ = player => this.setState({ playerNumberQ: player.target.value })

  selectFactionPool = factionPool => this.setState({ factionPoolQ: factionPool.target.value })

  handleRandomizePool = e => this.setState({ randomizePoolQ: e.target.value })

  componentDidMount() {
    const data = fetchSmashUpData()
    let options = [];
    data.selectFacArr.map((faction) => {
      return (
        options.push({
          value: faction,
          name: faction
        })
      )
    })

    this.setState({
      smashUpdata: data.sets,
      selectedFactions: data.selectFacObj,
      totalFactionsNum: data.selectFacArr.length, 
      factionsQ: options
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
                                                    historyCheck={this.state.historyCheckRandomizer}
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
                                                   history={this.state.historyLogArray}  
                                                   totalFactionsNum={this.state.totalFactionsNum}     
                                                  />} 
              />
              <Route path="/queensberry" render={() => <QueensberryPage 
                                                        smashUpdata={this.state.smashUpdata}
                                                        handleSubmitHistory={this.handleSubmitHistory}
                                                        historyCheck={this.state.historyCheckQueensberry}
                                                        handleHistoryCheckQueensberry={this.handleHistoryCheckQueensberry}
                                                        factionResults={this.state.factionResults}
                                                        selectedFactions={this.state.selectedFactionsQ}
                                                        selectedFaction={this.state.selectedFactionQ}
                                                        factions={this.state.factionsQ}
                                                        submitFactions={this.state.submitFactionsQ}
                                                        playerNumber={this.state.playerNumberQ}
                                                        factionNumber={this.state.factionNumberQ}
                                                        factionPool={this.state.factionPoolQ}
                                                        randomizePool={this.state.randomizePoolQ}
                                                        currentPlayer={this.state.currentPlayerQ}
                                                        playerFactions={this.state.playerFactionsQ}
                                                        settings={this.state.settingsQ}

                                                        handleSubmitSelection={this.handleSubmitSelection}
                                                        handleDeselect={this.handleDeselect}
                                                        handleSelectionChange={this.handleSelectionChange}
                                                        handleClearSelection={this.handleClearSelection}
                                                        handlePlayerFactionSelection={this.handlePlayerFactionSelection}
                                                        handlePlayerFactionSelectionSubmit={this.handlePlayerFactionSelectionSubmit}
                                                        handleToggleSettings={this.handleToggleSettings}
                                                        selectPlayerNumber={this.selectPlayerNumberQ}
                                                        selectFactionPool={this.selectFactionPool}
                                                        handleRandomizePool={this.handleRandomizePool}
                                                        handleRevertAllPlayerFactionSelections={this.handleRevertAllPlayerFactionSelections}
                                                      />} 
              />
            </Switch>}
        </div>
      </div>
    );
  }
}