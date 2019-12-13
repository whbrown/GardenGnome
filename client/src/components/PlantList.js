import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazy-load';
import styled from 'styled-components'
import axios from 'axios'
import { useAlert } from 'react-alert'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import EcoIcon from '@material-ui/icons/Eco';
import RedeemIcon from '@material-ui/icons/Redeem';
import '../App.css'


/* ---------------------------------------------------------- Styled Components --------------------------------------------------------- */
import PlantCard from '../components/reuse/PlantCard';
import CardHeading from '../components/reuse/CardHeading'
import CardSubheading from '../components/reuse/CardSubheading'
import ButtonGreen from '../components/reuse/ButtonGreen'
import { use } from "bcrypt/promises";

const Img = styled.img`
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 8px;
`
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const PlantList = (props) => {

  let classes = useStyles();

  let alert = useAlert()

  let addToGarden = (plantId, commonName) => {
    axios
      .post(`/api/plants/addtogarden`, { plantId: plantId, commonName: commonName })
      .then(updatedUser => {
        alert.show('Added to garden!', { type: 'success' })
      })
      .catch(err => {
        console.log(err);
      });
  }

  let addToWishlist = (plantId, commonName) => {
    axios
      .post(`/api/plants/addtowishlist`, { plantId: plantId, commonName: commonName })
      .then(updatedUser => {
        console.log("Successfully added to WISHLIST and here's the new user info: ", updatedUser)
        alert.show('Added to WISHLIST!', { type: 'success' })
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div style={{ marginBottom: "80px" }}>
      {props.filteredPlants ? props.filteredPlants.slice(0, 200).map((plant, index) => {
        const commonName = plant.plantCommonNames.length > 2 ? `${plant.plantCommonNames[1]}, ${plant.plantCommonNames[2]}` : plant.plantCommonNames.length > 2 ? `${plant.plantCommonNames[0]}, ${plant.plantCommonNames[1]}` : plant.plantCommonNames[0];
        const encodedLatinName = encodeURI(plant.plantLatinName);
        return (
          <PlantCard key={plant._id}>
            <Link to={`/plants/id=${plant._id}&latinName=${encodedLatinName}`} >
              <LazyLoad offsetVertical={300}>
                <Img src={plant.plantImageURL ? plant.plantImageURL : 'https://icon-library.net/images/pngtree-green-leaf-icon-graphic-design-template-vector-png-image_530815.jpg'} />
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
              <Button
                onClick={() => addToGarden(plant._id, commonName)}
                variant="contained"
                color="default"
                size="small"
                className={classes.button}
                startIcon={<EcoIcon />}
                style={{ width: "93%", height: "25px", margin: "3px 10px", fontSize: "0.6rem", backgroundColor: "green", color: "white" }}
              >
                Add to my garden
              </Button>
              <Button
                onClick={() => addToWishlist(plant._id, commonName)}
                variant="contained"
                color="default"
                size="small"
                className={classes.button}
                startIcon={<RedeemIcon />}
                style={{ width: "93%", height: "25px", margin: "3px 10px", fontSize: "0.6rem" }}
              >
                Save to wishlist
              </Button>
            </div>
          </PlantCard>
        )
      }) : 'Nothing found.'
      }
    </div>
  );
};


export default PlantList