import React, { Component } from 'react';
import { PageHeader, Well, Media, Image, Button, Popover, OverlayTrigger, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import FontAwesome from 'react-fontawesome';
import '../styles/FactionsPage.css';

const MinionCardsSummary = ({minion, cardImage}) => {
	const popoverClickRootClose = (
	  <Popover id="popover-trigger-click-root-close">
	    <Thumbnail src={cardImage} alt={minion.name}></Thumbnail>
	  </Popover>	
	)
	return (
		<div>
			<OverlayTrigger trigger="click" rootClose placement="right" overlay={popoverClickRootClose} animation>
				<FontAwesome name="picture-o"/>
			</OverlayTrigger>
			<span> {minion.quantity}x <strong>{minion.name}</strong> - Power {minion.power} - {minion.ability}</span>
		</div>
	)
}

const ActionCardsSummary = ({action, cardImage}) => {
	const popoverClickRootClose = (
	  <Popover id="popover-trigger-click-root-close">
	    <Thumbnail src={cardImage} alt={action.name}></Thumbnail>
	  </Popover>	
	)

	return (
		<div>
			<OverlayTrigger trigger="click" rootClose placement="right" overlay={popoverClickRootClose} animation>
				<FontAwesome name="picture-o"/>
			</OverlayTrigger>
			<span> {action.quantity}x <strong>{action.name}</strong> - {action.ability} </span>
		</div>
	)
}

class FactionsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showCard: false
		}
	}

	render() {
		const factionName = this.props.match.params.faction;
		const setName = this.props.match.params.set;
		const set = this.props.smashUpData
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
						{faction.deck.minions.map((minion) => (<MinionCardsSummary key={minion.name} minion={minion} cardImage={faction.image} />))}
					</div>
					<h2>Actions</h2>
					<div>
						{faction.deck.actions.map((action) => (<ActionCardsSummary key={action.name} action={action} cardImage={faction.image} />))}
					</div>
				</Well>
			</div>
		)
	}
}

export default FactionsPage;