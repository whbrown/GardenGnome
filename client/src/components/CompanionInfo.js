import React, { Component } from "react";


export default class CompanionInfo extends Component {
  render() {
    return (
      <table className="table-container">
          <thead>
            <tr>
              <th>Common name</th>
              <th>Go back</th>
              <th>Attracts</th>
              <th>Helped by</th>
              <th>Helps</th>
              <th>Repels</th>
              <th>Avoid</th>
              <th>Comments</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.companionPlants.map((plant, index) => {
                return (
                  <tr>
                    <td style={{marginTop: '50vh'}}><h1 className="tableh1">{plant.commonName}</h1></td>
                    <td><button className="learn-more" style={{alignSelf: 'center', justifySelf: 'center', margin: '1em 7em 2em'}} onClick={this.props.resetCompanionsTable}>Return to Garden</button></td>
                    <td><h1 className="tableh1">Attracts: </h1><ul>{plant.attracts.map((attraction, index) => <li key={index}><h2 className='tableh2'>{attraction}</h2></li>)}</ul></td>
                    
                    <td><h1 className="tableh1">Helper: </h1><ul>{plant.helpedBy.map((helper, index) => <li key={index}><h2 className='tableh2'>{helper}</h2></li>)}</ul></td>
                    <td><h1 className="tableh1">Helped: </h1><ul>{plant.helps.map((helped, index) => <li key={index}><h2 className='tableh2'>{helped}</h2>)</li>)}</ul></td>
                    <td><h1 className="tableh1">Repelled: </h1><ul>{plant.repels.map((repelled, index) => <li key={index}><h2 className='tableh2'>{repelled}</h2>)</li>)}</ul></td>
                    <td><h1 className="tableh1">To Avoid: </h1><ul>{plant.avoid.map((toAvoid, index) => <li key={index}><h2 className='tableh2'>{toAvoid}</h2>)</li>)}</ul></td>
                    <td><h1 className="tableh1">Comments: </h1><h2 className='tableh2'>{plant.comments}</h2></td>
                    <td><h1 className="tableh1">Category: </h1><h2 className='tableh2'>{plant.category}</h2></td>
                    <td><button className="learn-more" style={{alignSelf: 'center', justifySelf: 'center', margin: '1em 7em 2em'}} onClick={this.props.resetCompanionsTable}>Return to Garden</button></td>
                  </tr>
                  
                )
              })
            }
          </tbody>
        </table>
    )
  }
}
