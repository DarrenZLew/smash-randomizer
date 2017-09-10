import React from 'react';
import { Button, Modal, FormGroup, ControlLabel, Radio, Checkbox } from 'react-bootstrap';

const FormSettings = ( {smashUpData, showSettings, close, selectedPlayer, handlePlayerNumber, factionNumber, handleFactionNumber, handleToggleSet} ) => {
	return (
		<div>
			{smashUpData && 
				<Modal show={showSettings} onHide={close}>
					<Modal.Header closeButton>
						<Modal.Title>Game Settings</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form className="formsettings-groupSettings">
							<FormGroup controlId="playerNumbers">
								<ControlLabel>Number of Players</ControlLabel>
								<br />
					      <Radio name="playerNumber2" value="2" checked={selectedPlayer === '2'} onChange={handlePlayerNumber} inline>
					        2
					      </Radio>
					      {' '}
					      <Radio name="playerNumber3" value="3" checked={selectedPlayer === '3'} onChange={handlePlayerNumber} inline>
					        3
					      </Radio>
					      {' '}	
					      <Radio name="playerNumber4" value="4" checked={selectedPlayer === '4'} onChange={handlePlayerNumber} inline>
					        4
					      </Radio>
					      {' '}
					      <Radio name="playerNumber5" value="5" checked={selectedPlayer === '5'} onChange={handlePlayerNumber} inline>
					        5
					      </Radio>
					      {' '}
					      <Radio name="playerNumber6" value="6" checked={selectedPlayer === '6'} onChange={handlePlayerNumber} inline>
					        6
					      </Radio>							
							</FormGroup>


							<FormGroup controlId="factionsPerPlayer">
								<ControlLabel>Number of Players</ControlLabel>
								<br />
					      <Radio name="1" value="1" checked={factionNumber === '1'} onChange={handleFactionNumber} inline>
					        1
					      </Radio>
					      {' '}
					      <Radio name="2" value="2" checked={factionNumber === '2'} onChange={handleFactionNumber} inline>
					        2 (Normal)
					      </Radio>
					      {' '}	
					      <Radio name="3" value="3" checked={factionNumber === '3'} onChange={handleFactionNumber} inline>
					        3
					      </Radio>
					      {' '}
					      <Radio name="4" value="4" checked={factionNumber === '4'} onChange={handleFactionNumber} inline>
					        4
					      </Radio>							
							</FormGroup>



					    <FormGroup controlId="Enable Sets">
					    	<ControlLabel>Enable Sets</ControlLabel>
					    	{smashUpData.map((set,index) => {
					    		return (
					    			<Checkbox key={set.name} value={set.name} checked={set.checked} onChange={() => handleToggleSet(set,index)} >{set.name}</Checkbox>
					    		)
					    	})}
					    </FormGroup>
				    </form>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={close}>Close</Button>
					</Modal.Footer>
				</Modal>}
		</div>
	)
}

export default FormSettings;