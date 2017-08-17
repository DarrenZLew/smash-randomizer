import React from 'react';
import FactionSettings from './FactionSettings';
import DisplayRandomizePlayers from './DisplayRandomizePlayers';
import { Grid, Row, Col, Button } from 'react-bootstrap';

const RandomizePage = ( {smashUpData, selectedFactions, handleToggleFaction, handleRandomize, openSettings, results, playerFactions, playerNumber, handleReturnEditSettings, handleSubmitHistory, history} ) => {
  return (
    <div>
      <RandomizeSettingsButtons 
        handleRandomize={handleRandomize} 
        openSettings={openSettings} 
        handleReturnEditSettings={handleReturnEditSettings} 
        results={results}
        handleSubmitHistory={handleSubmitHistory}
        history={history}
      />

      {!results && <FactionSettings 
                      smashUpData={smashUpData} 
                      selectedFactions={selectedFactions} 
                      handleToggleFaction={handleToggleFaction}
      />}
      {results && <DisplayRandomizePlayers 
                    playerFactions={playerFactions} 
                    playerNumber={playerNumber}
      />}
    </div>
  )
}

const RandomizeSettingsButtons = ( {handleRandomize, openSettings, handleReturnEditSettings, results, handleSubmitHistory, history} ) => {
  const historyMessage = history.checked ? "Saved" : "Save to History Log"
  return (
    <Grid className="randomizeSettings-grid">
      <Row>
        <Col sm={6}>
          <Button block className='randomizeButton' onClick={handleRandomize} >Randomize!</Button> 
        </Col>
        <Col sm={6}>
          {!results && <Button block className='editSettingsButton' onClick={openSettings} >Edit Game Settings</Button>}
          {results && <Button block className='returnSettingsButton' onClick={handleReturnEditSettings}>Return to Settings</Button>}
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          {results && <Button block className='submitHistoryButton' onClick={handleSubmitHistory}>{historyMessage}</Button>}
        </Col>
      </Row>
    </Grid>
  )
}

export default RandomizePage;