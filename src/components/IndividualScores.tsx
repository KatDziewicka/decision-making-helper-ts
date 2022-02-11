import { useEffect, useReducer, useState } from "react";
import { calculateScore } from "../utils/calculateScore";
import {
  CriterionKinds,
  IScoresAction,
  IScoresState,
} from "../utils/Interfaces";

interface IndividualScoresProps {
  firstFactorWeight: string;
  secondFactorWeight: string;
  thirdFactorWeight: string;
  firstFactorName: string;
  secondFactorName: string;
  thirdFactorName: string;
}
export default function IndividualScores({
  firstFactorWeight,
  secondFactorWeight,
  thirdFactorWeight,
  firstFactorName,
  secondFactorName,
  thirdFactorName,
}: IndividualScoresProps): JSX.Element {
  const [state, dispatch] = useReducer(scoreReducer, {
    firstFactorScore: "0",
    secondFactorScore: "0",
    thirdFactorScore: "0",
  });

  function scoreReducer(state: IScoresState, action: IScoresAction) {
    const { type, newScore } = action;
    switch (type) {
      case CriterionKinds.ONE:
        return {
          ...state,
          firstFactorScore: newScore,
        };
      case CriterionKinds.TWO:
        return {
          ...state,
          secondFactorScore: newScore,
        };
      case CriterionKinds.THREE:
        return {
          ...state,
          thirdFactorScore: newScore,
        };
    }
  }

  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    setScore(
      calculateScore(
        state.firstFactorScore,
        firstFactorWeight,
        state.secondFactorScore,
        secondFactorWeight,
        state.thirdFactorScore,
        thirdFactorWeight
      )
    );
  }, [state, firstFactorWeight, secondFactorWeight, thirdFactorWeight]);

  return (
    <div>
      <div>
        {firstFactorName} score: {state.firstFactorScore}
        <input
          className="nodrag"
          type="range"
          id="taste"
          name="taste"
          min="0"
          max="100"
          onChange={(e) =>
            dispatch({ type: CriterionKinds.ONE, newScore: e.target.value })
          }
        ></input>
      </div>
      <div>
        {secondFactorName} score: {state.secondFactorScore}
        <input
          className="nodrag"
          type="range"
          id="value"
          name="value"
          min="0"
          max="100"
          onChange={(e) =>
            dispatch({
              type: CriterionKinds.TWO,
              newScore: e.target.value,
            })
          }
        ></input>
      </div>
      <div>
        {thirdFactorName} score: {state.thirdFactorScore}
        <input
          className="nodrag"
          type="range"
          id="healthiness"
          name="healthiness"
          min="0"
          max="100"
          onChange={(e) =>
            dispatch({
              type: CriterionKinds.THREE,
              newScore: e.target.value,
            })
          }
        ></input>
      </div>
      <div>
        <h3>Score: {parseFloat(score.toFixed(1))}</h3>
      </div>
    </div>
  );
}
