import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sets.css';

const Sets = ({ match, smashUpData }) => {
	return (
		<div>
			<h2>Choose a faction below to learn more about it!</h2>
			<div className="sets-container">
				{smashUpData.map((set,index) => (
					<div className="sets-content" key={set.name}>
						<p className="text-center sets-setName">{set.name}</p>
						<ul className="sets-factionsList">
							<FactionsList factions={set.factions} setName={set.name} index={index} match={match}/>
						</ul>
					</div>
				))}
			</div>
		</div>
	)
}

const FactionsList = ({ factions,setName,index,match }) => {
	const factionItem = factions.map(faction => (
		<li className="sets-faction" key={faction.title}><Link to={`${match.url}/${setName}/${faction.title}`}>{faction.title}</Link></li>
	))
	return (
		<ul key={index} >{factionItem}</ul>
	)
}

export default Sets;