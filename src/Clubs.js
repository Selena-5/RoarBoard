// Clubs.js
import React from 'react';

function Clubs() {
  return (
    <>
      <h3>Toggle which clubs you would like to subscribe to:</h3>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="SWEClub" />
        <label className="form-check-label" htmlFor="SWEClub">Software Engineering Club</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="BBCLub" />
        <label className="form-check-label" htmlFor="BBCLub">Basketball Club</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="HealthClub" />
        <label className="form-check-label" htmlFor="HealthClub">Health Club</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="SoccerClub" />
        <label className="form-check-label" htmlFor="SoccerClub">Soccer Club</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="WritingClub" />
        <label className="form-check-label" htmlFor="WritingClub">Writing Club</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="FBClub" />
        <label className="form-check-label" htmlFor="FBClub">Football Club</label>
      </div>
    </>
  );
}

export default Clubs;
