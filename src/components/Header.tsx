import { useState } from "react";
import "../styles/Header.css";

export default function Header(): JSX.Element {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const showHidePopUp = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="topBar">
      <h1>Welcome to your personal choice assistant!</h1>
      <p className="subheading">
        I will help you make even the toughest decisions.
      </p>
      <button className="popup" onClick={showHidePopUp}>
        How it works
        <span className={showInfo === true ? "visible" : "hidden"} id="myPopup">
          <p>Tough decision ahead of you? Tackle it with our handy tool!</p>
          <p>
            Think of three most important factors to consider when making this
            decision: you might want to consider the price, comfort and safety
            of a car, or the distance, affordability and weather in vacation
            spots!{" "}
          </p>
          <p>
            Input the factors in the three upper boxes, along with the weight
            from 1-5: how important are these to you?
          </p>
          <p>
            Next, input three elements you're choosing from: how about a city
            break in Paris, a relaxing beach holiday in Spain or an active
            weekend in the Lake District?
          </p>
          <p>
            Using the sliders, assess the three choices on the factors you had
            inputted.
          </p>
          <p>
            The score for each option is displayed! You can change the scores,
            weights, options and factors whenever you like.
          </p>
          <p>Enjoy!</p>
        </span>
      </button>
    </div>
  );
}
