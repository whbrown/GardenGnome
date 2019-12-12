{dgPlantCharacteristics.height.length ?
  <div id='height'>
    <h5 className="my-0">Height</h5>
    <ul className="list-group">
      {dgPlantCharacteristics.height.map((plantHeight, index) => {
        return <CharacteristicTopic key={index} property={plantHeight} />
      })}
    </ul>
  </div> : <></>}
  {dgPlantCharacteristics.spacing.length ?
  <div id='spacing'>
    <h5 className="my-0">Spacing</h5>
    <ul className="list-group">
      {dgPlantCharacteristics.spacing.map((plantSpacing, index) => {
        return <CharacteristicTopic key={index} property={plantSpacing} />
      })}
    </ul>
  </div> : <></>}