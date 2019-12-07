import React from "react";

class PlantList extends Component {

  // componentDidUpdate() {
  //   console.log('filtered plants:',  this.props.plants);
  //   console.log('update')
  // }


  render() {
    // console.log(this.props.plants.length)
    // console.log(this.props.plants)
    return (
      <div>
        {this.props.plants ? this.props.plants.slice(0, 5).map((plant, index) => {
          const commonName = plant.plantCommonNames.length > 1 ? plant.plantCommonNames[1] : plant.plantCommonNames[0];
          return (
            <div key={plant._id}>
              <h3>
                {`${index}.`} {plant.plantLatinName}
              </h3>
              <h4>{commonName}</h4>
              {/* <img alt={plant.plantImageURL} /> */}
              <p>{plant.plantImageURL}</p>
            </div>)
    }) : ''
        }
      </div>
    );
  }
};


export default PlantList