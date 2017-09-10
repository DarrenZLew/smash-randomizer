import React from 'react';
import { ListGroup, ListGroupItem, Panel, Col, Row, Grid, Well } from 'react-bootstrap';
import '../styles/HistoryPage.css';

const HistoryGame = ({game, gameNumber}) => {
	let indexCounter = 0
	const historyGameItem = game.playerFactions.factions.map((playerFaction,index) => (
			<Col xs={6} sm={4} md={2} key={game.playerFactions.playerIds[index]}>
				<Panel header={game.playerFactions.playerIds[index]} className="text-center historygame-listgroupitem-header">
				{playerFaction.map((faction, index) => {
					indexCounter++
					return (
						<ListGroupItem className="text-center historygame-listgroupitem" key={game.playerFactions.factionIds[indexCounter-1]}>
							{faction}
						</ListGroupItem>
					)
				})}
				</Panel>
			</Col>
	))
	return (
		<Row className="historygame-game">
			<ListGroup className="historygame-listgroup">
				<p className="text-center historygame-summary-header">Game {gameNumber}</p>
				{historyGameItem}
			</ListGroup>
		</Row>		
	)
}

const HistoryGameSummary = ({game, totalFactionsNum}) => {
	function factorial(n) {
		if (n === 0) {
			return 1
		}
		return n * factorial(n - 1)
	}
	let selectedFactionsNum = 0
	let combinationNumber = 0
	if (game.selectedFactions !== null) {
		selectedFactionsNum = Object.keys(game.selectedFactions).length
		combinationNumber = factorial(selectedFactionsNum) / (factorial(game.factionNumber) * factorial(selectedFactionsNum - game.factionNumber))
	}
	const factionPool = game.factionPool !== null ? game.factionPool.join(", ") : null
	return (
		<Row className="historygame-summary">
			<Col><strong>Mode:</strong> {'\t'} {game.mode}</Col>
			<Col><strong>Number of Players:</strong> {'\t'} {game.playerNumber}</Col>
			<Col><strong>Number of Factions Per Player:</strong> {'\t'} {game.factionNumber}</Col>
			{game.mode === "Queensberry" &&
				<div>
					<Col><strong>Randomized Pool:</strong> {'\t'} {game.randomized}</Col>
					<Col><strong>Number of Factions in Pool:</strong> {'\t'} {game.factionPoolNumber}</Col>
					<Col><strong>Factions in Pool:</strong> {'\t'} {factionPool}</Col>
				</div>
			}			
			{game.selectedFactions !== null &&
				<div>
					<Col><strong>Factions Selected / Total Factions:</strong> {'\t'} {selectedFactionsNum} / {totalFactionsNum} </Col>
					<Col><strong>Number of Possible Faction Combinations:</strong> {'\t'} {combinationNumber} </Col>
				</div>
			}
		</Row>
	)
}

const HistoryPage = ({history, totalFactionsNum}) => {
	const historyMessage = history.length === 0 ? "(Game log currently contains no data)" : ""
	let gameNumber = 0;
	const gameHistory = history.map((game,index) => {
	gameNumber++;
		return (
			<Grid key={index}>
				<Well className="historygame-container">
					<HistoryGame game={game} gameNumber={gameNumber}/>
					<HistoryGameSummary game={game} gameNumber={gameNumber} totalFactionsNum={totalFactionsNum}/>
				</Well>
			</Grid>
		)
	})
	return (
		<div>
			<h1 className="text-center">History Game Log</h1>
			<h4>{historyMessage}</h4>  
			{gameHistory}
		</div>
	)
}

export default HistoryPage;