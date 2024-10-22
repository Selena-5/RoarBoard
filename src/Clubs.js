
import React from 'react';

function Clubs() {
  return (
    <>
      <h3>Toggle which clubs you would like to subscribe to:</h3>
      <h3>     </h3>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="SWEClub" />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Software Engineering Club</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="BBCLub" />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Basketball Club</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="HealthClub" />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Health Club</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="SoccerClub" />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Soccer Club</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="WritingCLub" />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Writing Club</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="FBClub" />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Football Club</label>
      </div>

    </>
  );
}

export default Clubs;
