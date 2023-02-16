import React from "react";
import stickman from "../assets/guy.png";

export default function Home() {
  return (
    <div className="welcomecontainer">
      <img className="stick" alt="stick man" src={stickman} />
      <span className="welcometo">Welcome to APPLIED</span>
      <br></br>
      <span className="slogan">
        Keeping your job search organized is the first step to getting hired.
      </span>
      <br></br>
      <div className="getstarted">Sign Up or Log In to Get Organized</div>
    </div>
  );
}
