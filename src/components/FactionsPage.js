import React from 'react';
import { PageHeader, Well, Media, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import '../styles/FactionsPage.css'

const MinionCard = ({minion}) => (
	<div>
		{minion.quantity}x <strong>{minion.name}</strong> - Power {minion.power} - {minion.ability}
	</div>
)

const ActionCard = ({action}) => (
	<div>
		{action.quantity}x <strong>{action.name}</strong> - {action.ability}
	</div>
)

const FactionsPage = ( {match, smashUpData, handleReturnToSets} ) => {
	const factionName = match.params.faction;
	const setName = match.params.set;
	const set = smashUpData
		.filter(set => set.name === setName)[0]
		.factions.filter(faction => faction.title === factionName)
	const faction = set[0]
	return (
	<div>
		<Link to="/sets"><Button>Return to Sets Page</Button></Link>
		<PageHeader className="text-center factionspage-faction-title">{faction.title}</PageHeader>
		<h3>{faction.description}</h3>
		<Well>
			<Media>
				<Media.Left align="middle">
					<Image width={64} height={64} src={faction.image} alt={faction.title}/>
				</Media.Left>
				<Media.Body className="media-middle factionspage-deck-description">
					<p><em>{faction.deck.description}</em></p>
					<p className="text-center">- {setName} rulebook</p>
				</Media.Body>
			</Media>
		</Well>
		<Well className="factionspage-card">
			<h2>Minions</h2>
			<div>
				{faction.deck.minions.map((minion) => (<MinionCard key={minion.name} minion={minion} />))}
			</div>
			<h2>Actions</h2>
			<div>
				{faction.deck.actions.map((action) => (<ActionCard key={action.name} action={action} />))}
			</div>
		</Well>
	</div>
	)
}

export default FactionsPage;