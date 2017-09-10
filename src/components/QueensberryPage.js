import React from 'react';
import { Button, Row, Col, HelpBlock, ListGroup, ListGroupItem, Panel } from 'react-bootstrap'; 
import FilteredMultiSelect from 'react-filtered-multiselect';
import FontAwesome from 'react-fontawesome';
import QueensberrySettings from './QueensberrySettings';

const BOOTSTRAP_CLASSES = {
  filter: 'form-control queensberry-selectFactions-filter',
  select: 'form-control queensberry-selectFactions-select',
  button: 'btn btn-block queensberry-selectFactions-selectButton',
}

const QueensberrySelectButtons = ({handlePlayerFactionSelectionSubmit}) => (
	<Row>
		<Col sm={6}><Button className="queensberry-page-submitButton" block onClick={() => handlePlayerFactionSelectionSubmit('select')}>Select Faction</Button></Col>
		<Col sm={6}><Button className="queensberry-page-revertPrevSelectionButton" block onClick={() => handlePlayerFactionSelectionSubmit('deselect')}>Revert Previous Selection</Button></Col>
	</Row>	
)

const QueensberryRevertButtuns = ({handlePlayerFactionSelectionSubmit, handleRevertAllPlayerFactionSelections}) => (
	<Col><Button className="queensberry-page-revertPrevSelectionButton" block onClick={handleRevertAllPlayerFactionSelections}>Start Selections Over</Button></Col>
)

const SelectOwnFactions = ({selectedFactions, handleSelectionChange, factions, handleDeselect, handleClearSelection, handleSubmitSelection, factionPool}) => {
	const factionPoolNumber = parseInt(factionPool, 10)
	return (
		<Row className="queensberry-selectFactions-container">
			<Col sm={6}>
				<HelpBlock className="text-center">Select {factionPoolNumber} factions from the list</HelpBlock>
				<FilteredMultiSelect 
					classNames={BOOTSTRAP_CLASSES}
					onChange={handleSelectionChange}
					options={factions}
					selectedOptions={selectedFactions}
					textProp="name"
					valueProp="value"
					size={14}
					placeholder="Search"
				/>
			</Col>	    
	    <Col sm={6}>
	    	<h3 className="text-center">Faction Pool</h3>
	      {selectedFactions.length === 0 && <p className="queensberry-selectFactions-poolList">(nothing selected yet)</p>}
	      {selectedFactions.length > 0 && <ol className="queensberry-selectFactions-poolList">
	        {selectedFactions.map((faction, index) => <li key={faction.value}>
	          {`${faction.name} `}
	          <span style={{cursor: 'pointer'}} onClick={() => handleDeselect(index, 'select')}>
	            <FontAwesome name="times-circle"/>
	          </span>
	        </li>)}
	      </ol>}
	      {selectedFactions.length > 0 && <Col sm={6}><Button block className="btn btn-primary" onClick={handleClearSelection}>
	        Clear Selection
	      </Button></Col>}
	      {selectedFactions.length < factionPoolNumber && selectedFactions.length > 0 && <Col sm={6}><Button block className="btn btn-danger">Submit Pool</Button></Col>}
	      {selectedFactions.length === factionPoolNumber && <Col sm={6}><Button block className="btn btn-success" onClick={handleSubmitSelection}>Submit Pool</Button></Col>}
	    </Col>					
		</Row>	
	)
}

const SelectRandomFactions = ({selectedFactions, handleSelectionChange, factions, handleDeselect, handleClearSelection, handleSubmitSelection, factionPool}) => {
	const factionPoolNumber = parseInt(factionPool, 10)
	return (
		<Row className="queensberry-selectFactions-container">
			<Col sm={6}>
				<HelpBlock className="text-center">Select at least {factionPoolNumber} factions from the list to randomize</HelpBlock>
				<FilteredMultiSelect 
					classNames={BOOTSTRAP_CLASSES}
					onChange={handleSelectionChange}
					options={factions}
					selectedOptions={selectedFactions}
					textProp="name"
					valueProp="value"
					size={14}
					placeholder="Search"
				/>
			</Col>	    
	    <Col sm={6}>
	      {selectedFactions.length === 0 && <p className="queensberry-selectFactions-poolList">(nothing selected yet)</p>}
	      {selectedFactions.length > 0 && <ol className="queensberry-selectFactions-poolList">
	        {selectedFactions.map((faction, index) => <li key={faction.value}>
	          {`${faction.name} `}
	          <span style={{cursor: 'pointer'}} onClick={() => handleDeselect(index, 'select')}>
	            <FontAwesome name="times-circle"/>
	          </span>
	        </li>)}
	      </ol>}
	      {selectedFactions.length > 0 && <Col sm={6}><Button block className="btn btn-primary" onClick={handleClearSelection}>
	        Clear Selection
	      </Button></Col>}
	      {selectedFactions.length < factionPoolNumber && selectedFactions.length > 0 && <Col sm={6}><Button block className="btn btn-danger">Submit Randomized Pool</Button></Col>}
	      {selectedFactions.length >= factionPoolNumber && <Col sm={6}><Button block className="btn btn-success" onClick={handleSubmitSelection}>Submit Randomized Pool</Button></Col>}
	    </Col>					
		</Row>	
	)
}

const QueensberryShowFactions = ({playerFactions, selectedFactions, handlePlayerFactionSelection, handlePlayerFactionSelectionSubmit, factionResults, handleSubmitHistory, factionNumber, playerNumber, currentPlayer, historyCheck}) => {
	let factionMessage = 'Select First Faction for Player ' + currentPlayer.player
	if (currentPlayer.direction !== 'up') {
		factionMessage = 'Select Second Faction for Player ' + currentPlayer.player
	} 
	if (factionResults) {
		factionMessage = 'All Factions Selected!' 
	}	
	return(
	<div>
		<Row>
			<ListGroup>{playerFactions.map(player => {
				const header = 'Player ' + player.player
				return (
					<Col sm={6} key={player.player}>
						<Panel className="text-center queensberry-showFactions-listgroupitem-header" header={header}>{player.faction.map((faction,index) => {
							let className = "queensberry-showFactions-listgroupitem"
							if (player.player === currentPlayer.player && ((currentPlayer.direction === 'up' && index === 0) || (currentPlayer.direction !== 'up' && index === 1))) {
								className = "queensberry-showFactions-listgroupitem queensberry-showFactions-listgroupitem-Active"
							}
							return(<ListGroupItem className={className} key={index}>Faction {index + 1} {faction}</ListGroupItem>)}
						)}											
						</Panel>
					</Col>
				)
			})}
			</ListGroup>						
		</Row>

		<h3 className="text-center">{factionMessage}</h3>
		<QueensberrySelectButtons handlePlayerFactionSelectionSubmit={handlePlayerFactionSelectionSubmit}/>
		<Row>
			<Panel className="text-center queensberry-showFactions-listgroupitem-header queensberry-showFactions-listgroupitem-header-FactionPool" header="Faction Pool">
				<ListGroup>{selectedFactions.map((faction, index) => (
					<Col sm={6} key={faction.name}>
						<ListGroupItem className="queensberry-showFactions-listgroupitem" value={faction.name} onClick={e => handlePlayerFactionSelection(e,index)}>{faction.name}</ListGroupItem>
					</Col>
				))}
				</ListGroup>
			</Panel>
		</Row>
	</div>
	)
}

const QueensberryPage = ({smashUpdata, handleSubmitHistory, historyCheck, handleHistoryCheckQueensberry, factionResults, selectedFactions, selectedFaction, factions, submitFactions, playerNumber, factionNumber, factionPool, randomizePool, currentPlayer, playerFactions, settings, handleSubmitSelection, handleDeselect, handleSelectionChange, handleClearSelection, handlePlayerFactionSelection, handlePlayerFactionSelectionSubmit, handleToggleSettings, selectPlayerNumber, selectFactionPool, handleRandomizePool, handleRevertAllPlayerFactionSelections}) => {
  const historyMessage = historyCheck ? "Saved" : "Save to History Log"		

	return (
		<div>
			<h1 className="text-center">Kickin' It Queensberry</h1>
			{settings && !factionResults &&
				<QueensberrySettings 
					handleToggleSettings={handleToggleSettings} 
					handlePlayerNumber={selectPlayerNumber} 
					selectedPlayer={playerNumber}
					selectedFactionPool={factionPool}
					handleFactionPool={selectFactionPool}
					randomizePool={randomizePool}
					handleRandomizePool={handleRandomizePool}
				/>
			}
			{!settings && <Button className="queensberry-page-returnSettingsButton" block onClick={handleToggleSettings}>Return to Settings</Button>}
			{!settings && submitFactions && <QueensberryRevertButtuns 
				handlePlayerFactionSelectionSubmit={handlePlayerFactionSelectionSubmit} 
				handleRevertAllPlayerFactionSelections={handleRevertAllPlayerFactionSelections} 
			/>}	
			{factionResults && <Button className="queensberry-page-historyButton" block onClick={() => handleSubmitHistory("Queensberry", playerFactions, factionNumber, playerNumber)}>{historyMessage}</Button>}						
			{!settings && !submitFactions && randomizePool === "no" &&	!factionResults && 					
				<SelectOwnFactions 
					selectedFactions={selectedFactions} 
					handleSelectionChange={handleSelectionChange} 
					factions={factions} 
					handleDeselect={handleDeselect} 
					handleClearSelection={handleClearSelection}
					handleSubmitSelection={handleSubmitSelection}
					factionPool={factionPool}
				/>
			}
			{!settings && !submitFactions && randomizePool === "yes" && !factionResults &&
				<SelectRandomFactions 
					selectedFactions={selectedFactions} 
					handleSelectionChange={handleSelectionChange} 
					factions={factions} 
					handleDeselect={handleDeselect} 
					handleClearSelection={handleClearSelection}
					handleSubmitSelection={handleSubmitSelection}
					factionPool={factionPool}
				/>
			}

			{!settings && submitFactions &&
				<QueensberryShowFactions 
					playerFactions={playerFactions} 
					selectedFactions={selectedFactions} 
					handlePlayerFactionSelection={handlePlayerFactionSelection}
					handlePlayerFactionSelectionSubmit={handlePlayerFactionSelectionSubmit} 
					factionResults={factionResults} 
					handleSubmitHistory={handleSubmitHistory}
					factionNumber={factionNumber} 
					playerNumber={playerNumber}
					currentPlayer={currentPlayer}
					historyCheck={historyCheck}
				/> 
			}									
		</div>
	)
}

export default QueensberryPage