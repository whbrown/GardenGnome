import React, { Component } from "react";
import { Link } from "react-router-dom";
import PlantCard from '../components/reuse/PlantCard';


class PlantList extends Component {

  // componentDidUpdate() {
  //   console.log('filtered plants:',  this.props.plants);
  //   console.log('update')
  // }


  render() {
    // console.log(this.props.plants.length)
    // console.log('plantList props', this.props)
    return (
      <div>
        {this.props.filteredPlants ? this.props.filteredPlants.slice(0, 5).map((plant, index) => {
          const commonName = plant.plantCommonNames.length > 1 ? plant.plantCommonNames[1] : plant.plantCommonNames[0];
          const encodedLatinName = encodeURI(plant.plantLatinName);
          console.log(encodedLatinName);
          return (
            <Link to={`/plants/id=${plant._id}&latinName=${encodedLatinName}`} key={plant._id}>
              <PlantCard>
                <h3>
                  {`${index}.`} {plant.plantLatinName}
                </h3>
                <h4>{commonName}</h4>
                <img src={plant.plantImageURL} />
                {/* <p>{plant.plantImageURL}</p> */}
              </PlantCard>
            </Link>)
        }) : 'Nothing found.'
        }
      </div>
    );
  }
};


export default PlantList