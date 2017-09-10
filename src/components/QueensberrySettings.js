import React from 'react';
import { Button, FormGroup, ControlLabel, Radio, Well, Tooltip, OverlayTrigger } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import '../styles/QueensberryPage.css';

const Settings = ({selectedPlayer, handlePlayerNumber, selectedFactionPool, handleFactionPool, randomizePool, handleRandomizePool}) => {
	const tooltip = (
  	<Tooltip id="tooltip">Select your factions to randomize for the pool</Tooltip>
	)
	return (
		<form className="queensberry-settings-groupSettings">
			<FormGroup controlId="playerNumbers">
				<ControlLabel>Number of Players</ControlLabel>
				<br />
	      <Radio name="playerNumber2" value="2" checked={selectedPlayer === '2'} onChange={handlePlayerNumber} inline>
	        2
	      </Radio>
	      {' '}
	      <Radio name="playerNumber3" value="3" checked={selectedPlayer === '3'} onChange={handlePlayerNumber} inline>
	        3
	      </Radio>
	      {' '}	
	      <Radio name="playerNumber4" value="4" checked={selectedPlayer === '4'} onChange={handlePlayerNumber} inline>
	        4
	      </Radio>						
			</FormGroup>
			<FormGroup controlId="factionPoolNumbers">
				<ControlLabel>Number of Factions in Pool</ControlLabel>
				<br />
	      <Radio name="factionPoolNumber8" value="8" checked={selectedFactionPool === '8'} onChange={handleFactionPool} inline>
	        8
	      </Radio>
	      {' '}
	      <Radio name="factionPoolNumber10" value="10" checked={selectedFactionPool === '10'} onChange={handleFactionPool} inline>
	        10
	      </Radio>
	      {' '}	
	      <Radio name="factionPoolNumber12" value="12" checked={selectedFactionPool === '12'} onChange={handleFactionPool} inline>
	        12
	      </Radio>						
			</FormGroup>
			<FormGroup controlId="randomizePool">
				<ControlLabel>Randomize Faction Pool? 
					<OverlayTrigger placement="top" overlay={tooltip}>
						<span> <FontAwesome name="question-circle"/></span>
					</OverlayTrigger>
				</ControlLabel>
				<br />
				<Radio name="yes" value="yes" checked={randomizePool === 'yes'} onChange={handleRandomizePool} inline>
					Yes
				</Radio>								
				<Radio name="no" value="no" checked={randomizePool === 'no'} onChange={handleRandomizePool} inline>
					No
				</Radio>
			</FormGroup>
	  </form>	
  )
}

const QueensberrySettings = ({handleToggleSettings, handlePlayerNumber, selectedPlayer, selectedFactionPool, handleFactionPool, randomizePool, handleRandomizePool}) => (
	<Well className='queensberry-settings-container'>
		<Well className='queensberry-settings-instructions-container'>
			<ul className='queensberry-settings-instructions'>	
				<li>For formal Queensberry play:</li> 
				<li>Select a certain number of factions as your faction pool.</li>
				<li>Randomly determine who goes first.</li>
				<li>The first player chooses one faction from the pool.</li> 
				<li>Choice continues clockwise.</li>
				<li>When everyone has chosen one faction, the last player chooses a
					second faction. Choice continues in reverse order.</li>
			</ul>
		</Well>
		<Settings 
			handlePlayerNumber={handlePlayerNumber} 
			selectedPlayer={selectedPlayer} 
			selectedFactionPool={selectedFactionPool} 
			handleFactionPool={handleFactionPool} 
			randomizePool={randomizePool} 
			handleRandomizePool={handleRandomizePool} 
		/>

		<Button className="queensberry-settings-startButton" block onClick={handleToggleSettings}>Start Queensberry</Button>
	</Well>
)

export default QueensberrySettings