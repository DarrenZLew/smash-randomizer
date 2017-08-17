import React from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel, Radio, Checkbox } from 'react-bootstrap';

const FormSettings = (props) => {
	return (
		<div>
			{props.smashUpData && 
				<Modal show={props.showSettings} onHide={props.close}>
					<Modal.Header closeButton>
						<Modal.Title>Game Settings</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form>
							<FormGroup controlId="playerNumbers">
								<ControlLabel>Number of Players</ControlLabel>
								<br />
					      <Radio name="playerNumber2" value="2" checked={props.selectedPlayer === '2'} onChange={props.handlePlayerNumber} inline>
					        2
					      </Radio>
					      {' '}
					      <Radio name="playerNumber3" value="3" checked={props.selectedPlayer === '3'} onChange={props.handlePlayerNumber} inline>
					        3
					      </Radio>
					      {' '}	
					      <Radio name="playerNumber4" value="4" checked={props.selectedPlayer === '4'} onChange={props.handlePlayerNumber} inline>
					        4
					      </Radio>
					      {' '}
					      <Radio name="playerNumber5" value="5" checked={props.selectedPlayer === '5'} onChange={props.handlePlayerNumber} inline>
					        5
					      </Radio>
					      {' '}
					      <Radio name="playerNumber6" value="6" checked={props.selectedPlayer === '6'} onChange={props.handlePlayerNumber} inline>
					        6
					      </Radio>							
							</FormGroup>
					    <FormGroup controlId="gameMode">
					      <ControlLabel>Game Mode</ControlLabel>
					      <FormControl componentClass="select" placeholder="normal" value={props.factionNumber} onChange={props.handleFactionNumber}>
					        <option value="1" >Randomize 1 Faction</option>
					        <option value="2">Randomize 2 Factions (Normal Mode)</option>
					        <option value="3">Randomize 3 Factions</option>
					        <option value="4">Randomize 4 Factions</option>
					        <option value="draft" disabled>Draft Mode</option>
					      </FormControl>
					    </FormGroup>
					    <FormGroup controlId="Enable Sets">
					    	<ControlLabel>Enable Sets</ControlLabel>
					    	{props.smashUpData.map((set,index) => {
					    		return (
					    			<Checkbox key={set.name} value={set.name} checked={set.checked} onChange={() => props.handleToggleSet(set,index)} >{set.name}</Checkbox>
					    		)
					    	})}
					    </FormGroup>
				    </form>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={props.close}>Close</Button>
					</Modal.Footer>
				</Modal>}
		</div>
	)
}

export default FormSettings;