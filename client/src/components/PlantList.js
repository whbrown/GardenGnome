import React, { Component } from "react";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazy-load';
import axios from 'axios'
import { useAlert } from 'react-alert'
import PlantCard from '../components/reuse/PlantCard';
import CardHeading from '../components/reuse/CardHeading'
import CardSubheading from '../components/reuse/CardSubheading'
import ButtonGreen from '../components/reuse/ButtonGreen'


const PlantList = (props) => {

  // componentDidUpdate() {
  //   console.log('filtered plants:',  props.plants);
  //   console.log('update')
  // }

  let alert = useAlert()

  let addToGarden = (plantId, commonName) => {
    axios
      .post(`/api/plants/addtogarden`, { plantId: plantId, commonName: commonName })
      .then(updatedUser => {
        // console.log("Successfully added to garden and here's the new user info: ", updatedUser)
        // props.setUser(updatedUser.data)
        alert.show('Added to garden!', { type: 'success' })
      })
      .catch(err => {
        console.log(err);
      });
  }

  // console.log(props.plants.length)
  // console.log('plantList props', props)
  return (
    <div>
      {props.filteredPlants ? props.filteredPlants.slice(0, 200).map((plant, index) => {
        const commonName = plant.plantCommonNames.length > 1 ? plant.plantCommonNames[1] : plant.plantCommonNames[0];
        const encodedLatinName = encodeURI(plant.plantLatinName);
        // console.log("PLANT INFORMATION: ", plant)
        // console.log(encodedLatinName);
        return (
          <PlantCard key={plant._id}>
            <Link to={`/plants/id=${plant._id}&latinName=${encodedLatinName}`} >

              <LazyLoad offsetVertical={300}>
                <img src={plant.plantImageURL} style={{ width: "130px", height: "130px", objectFit: "cover", borderRadius: "10px" }} />
              </LazyLoad>
            </Link>
            <div style={{ width: "60%" }}>
              <Link to={`/plants/id=${plant._id}&latinName=${encodedLatinName}`} >
                <CardHeading >
                  {`${index + 1}.`} {plant.plantLatinName}
                </CardHeading>
                <CardSubheading>
                  {commonName}
                </CardSubheading>
              </Link>
              <ButtonGreen onClick={() => addToGarden(plant._id, commonName)} type="button" className="btn btn-success">Add to my garden</ButtonGreen>
            </div>
            {/* <p>{plant.plantImageURL}</p> */}
          </PlantCard>
        )
      }) : 'Nothing found.'
      }
    </div>
  );
};


export default PlantList