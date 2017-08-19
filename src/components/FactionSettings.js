import React from 'react';
import { Col, Accordion, Panel, Image } from 'react-bootstrap';

function Faction({ img,setIndex,factionName,selectedFactions,handleToggleFaction }) {
  let factionStyle = {};
  if (selectedFactions.hasOwnProperty(factionName)) {
    factionStyle = {
      main: "btn factionimage-row",
      text: "factionimage-factiontitle",
      img: "factionimage-imgwrapper"
    }
  } else {
    factionStyle = {
      main: "btn factionimage-row factionimage-row-active",
      text: "factionimage-factiontitle factionimage-factiontitle-active",
      img: "factionimage-imgwrapper factionimage-imgwrapper-active"
    }
  }

  return (
      <Col xs={12} sm={6} id={factionName} className={factionStyle.main} onClick={(event) => handleToggleFaction(event.currentTarget.id,setIndex)} >
        <div className={factionStyle.img}>
          <Image thumbnail src={img} alt={factionName} />
          <div className={factionStyle.text}>{factionName}</div>
        </div>
      </Col>
  )
}

function FactionGrid({ setIndex,factions,selectedFactions,handleToggleFaction }) {
  const factionImages = factions.map((faction, index) => {    
    return (
      <Faction 
        key={index} 
        img={faction.image} 
        setIndex={setIndex}
        factionName={faction.title}
        selectedFactions={selectedFactions}
        handleToggleFaction={handleToggleFaction}
      />
    )
  })
  return (
    <div>
      <div className="row text-center">
        {factionImages}
      </div>
    </div>
  )
}

const FactionsList = ({ smashUpData,selectedFactions,handleToggleFaction }) => {
  const panelGrouper = smashUpData.map(function(set,index) {
    return (
        <Panel 
          className="text-center factionslist-panel" 
          header={set.name} 
          eventKey={set.name} key={set.name}         
        >
          <FactionGrid setIndex={index} factions={set.factions} selectedFactions={selectedFactions} handleToggleFaction={handleToggleFaction} />
        </Panel>
    )
  })

  return (
    <Accordion>
      {panelGrouper}
    </Accordion>
  )
}


const FactionSettings = ({ smashUpData,selectedFactions,handleToggleFaction,handleRandomize,openSettings,results }) => {	
	return (
      <FactionsList  
				smashUpData={smashUpData}
        selectedFactions={selectedFactions}
        handleToggleFaction={handleToggleFaction} 
			/>
	)
}

export default FactionSettings;