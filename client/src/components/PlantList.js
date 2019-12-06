import React, {Component} from "react";

const PlantList = props => {
  return (
    <div>
      {props.projects.map(project => {
        return (
          <div key={project._id}>
            <h3>
              {project.title}
            </h3>
          </div>
        );
      })}
    </div>
  );
};


export default PlantList