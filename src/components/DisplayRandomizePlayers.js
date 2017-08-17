import React from 'react';
import { ListGroup, ListGroupItem, Panel, Col } from 'react-bootstrap';

const PlayerData = ({ playerFactions,playerNumber }) => {
	let indexCounter = 0
	const playerList = playerFactions.factions.map((playerFaction,index) => (
		<Col sm={6} key={playerFactions.playerIds[index]}>
			<Panel header={playerFactions.playerIds[index]} className="text-center playerdata-listgroup-header">
			{playerFaction.map((faction,index) => {
				indexCounter++
				return (
					<ListGroupItem className="text-left playerdata-listgroupitem" key={playerFactions.factionIds[indexCounter-1]} >Faction {index+1} - {faction} </ListGroupItem>					
				)
			})}
			</Panel>
		</Col>
	))
	return (
		<ListGroup className="playerdata-listgroup">
			{playerList}
		</ListGroup>
	)
}

const DisplayRandomizePlayers = ({ playerFactions,playerNumber,handleRandomize,handleReturnEditSettings,results }) => (
	<div>
		{playerFactions.length !== 0 && <PlayerData playerFactions={playerFactions} playerNumber={playerNumber} />}	
	</div>
)

export default DisplayRandomizePlayers;