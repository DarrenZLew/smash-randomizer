import React from 'react';
import { ListGroup, ListGroupItem, Panel, Col, Row } from 'react-bootstrap';
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
		<ListGroup className="historygame-listgroup">
			<ListGroupItem className="text-center historygame-listgroupitemrow-header">Game {gameNumber}</ListGroupItem>
			{historyGameItem}
		</ListGroup>		
	)
}

const HistoryPage = ({history}) => {
	const historyMessage = history.logArray.length === 0 ? "History log is currently empty." : ""
	let gameNumber = 0;
	const gameHistory = history.logArray.map((game,index) => {
		gameNumber++;
		return (
			<Row key={index} className="historygame-game">
				<HistoryGame game={game} gameNumber={gameNumber} />
			</Row>
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