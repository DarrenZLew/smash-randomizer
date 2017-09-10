import React from 'react';
import { Panel, ListGroup, ListGroupItem, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Sets.css';

const Sets = ({ match, smashUpData }) => {
	return (
		<div>
			<h2 className="text-center">Select a faction below to learn more about it!</h2>
				{smashUpData.map((set,index) => (
						<Col sm={6} md={12} key={set.name}>
							<Panel className="text-center sets-listgroupitem-header" header={set.name} >
								<ListGroup className="sets-listgroup">
										<FactionsList 
											factions={set.factions} 
											setName={set.name} 
											index={index} 
											match={match}
										/>
								</ListGroup>
							</Panel>
						</Col>
				))}
		</div>
	)
}

const FactionsList = ({ factions, setName, index, match }) => {
	const factionItem = factions.map(faction => {
		return (
		<Col sm={6} md={3} key={faction.title} className="sets-factionslist-col">
			<ListGroupItem className="text-center sets-factionslist-listgroupitem">
				<Link to={`${match.url}/${setName.replace('?','%3F')}/${faction.title}`}>
					<Panel className="sets-factionslist-panel">{faction.title}</Panel>
				</Link>
			</ListGroupItem>
		</Col>
	)})
	return (
		<ListGroup key={index}>{factionItem}</ListGroup>
	)
}

export default Sets;