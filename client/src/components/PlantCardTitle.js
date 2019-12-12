import React from "react";
const PlantCardTitle = props => {
  return (
    <div className="card-header d-flex justify-content-center">
      <h5 className="card-header-title my-0 text-center font-weight-bold">
        {props.title}
      </h5>
    </div>
  );
}
export default PlantCardTitle;