import React from 'react';
import { ListGroup, ListGroupItem, Panel, Col, Row, Grid } from 'react-bootstrap';
import '../styles/HistoryPage.css';

const HistoryGame = ({game, gameNumber}) => {
	let indexCounter = 0
	const historyGameItem = game.playerFactions.factions.map((playerFaction,index) => (
			<Col xs={6} sm={4} md={2} key={game.playerFactions.playerIds[index]}>
				<Panel header={game.playerFactions.playerIds[index]} className="text-center historygame-listgroupitem-header">
				{playerFaction.map((faction, index) => {
					indexCounter++
					return (
						<ListGroupItem className="text-left historygame-listgroupitem" key={game.playerFactions.factionIds[indexCounter-1]}>
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
				{historyGameItem}
			</ListGroup>
		</Row>		
	)
}

const HistoryGameSummary = ({game, gameNumber, totalFactionsNum}) => {
	function factorial(n) {
		if (n === 0) {
			return 1
		}
		return n * factorial(n - 1)
	}
	const combinationNumber = factorial(totalFactionsNum) / (factorial(game.factionNumber) * factorial(totalFactionsNum - game.factionNumber))
	return (
		<Row className="historygame-summary">
			<Col className="text-center historygame-summary-header"><h3>Game {gameNumber} Summary</h3></Col>
			<Col>Number of Players: {'\t'} {game.playerNumber}</Col>
			<Col>Number of Factions Per Player: {'\t'} {game.factionNumber}</Col>
			<Col>Factions Selected / Total Factions: {'\t'} {Object.keys(game.selectedFactions).length} / {totalFactionsNum} </Col>
			<Col>Total Number of Faction Combinations: {'\t'} {combinationNumber} </Col>
		</Row>
	)
}

const HistoryPage = ({history, totalFactionsNum}) => {
	const historyMessage = history.logArray.length === 0 ? "History log is currently empty." : ""
	let gameNumber = 0;
	const gameHistory = history.logArray.map((game,index) => {
	gameNumber++;
		return (
			<Grid key={index} className="historygame-container" >
				<HistoryGameSummary game={game} gameNumber={gameNumber} totalFactionsNum={totalFactionsNum}/>
				<HistoryGame game={game} />
			</Grid>
		)
	})

	return (
		<div>
			<h2>{historyMessage}</h2>  
			{gameHistory}
		</div>
	)
}

export default HistoryPage;