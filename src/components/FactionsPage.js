import React from 'react';
import { PageHeader, Well, Media, Image, Button, Popover, OverlayTrigger, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import FontAwesome from 'react-fontawesome';
import '../styles/FactionsPage.css';

const CardsSummary = ({card, type, cardImage}) => {
	const popoverClickRootClose = (
	  <Popover id="popover-trigger-click-root-close">
	    <Thumbnail src={cardImage} alt={card.name}></Thumbnail>
	  </Popover>	
	)
	return (
		<div>
			<OverlayTrigger trigger="click" rootClose placement="right" overlay={popoverClickRootClose} animation>
				<FontAwesome name="picture-o"/>
			</OverlayTrigger>
			{type === 'minion' ? (
				<span> {card.quantity}x <strong>{card.name}</strong> - Power {card.power} - {card.ability}</span>	
			) : (
				<span> {card.quantity}x <strong>{card.name}</strong> - {card.ability} </span>
			)}
		</div>
	)	
}

const FactionsPage = ( {match, smashUpData, } ) => {
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
					{faction.deck.minions.map((minion) => (<CardsSummary key={minion.name} card={minion} type='minion' cardImage={faction.image} />))}
				</div>
				<h2>Actions</h2>
				<div>
					{faction.deck.actions.map((action) => (<CardsSummary key={action.name} card={action} type='action' cardImage={faction.image} />))}
				</div>
				{faction.deck.titan &&
					<div>
						<h2>Titan</h2>
						{faction.deck.titan.map((titan) => (<CardsSummary key={titan.name} card={titan} type='titan' cardImage={faction.image} />))}	
					</div>
				}

			</Well>
		</div>
	)
}

export default FactionsPage;