import { useEffect, useReducer, useState } from "react";
import { calculateScore } from "../utils/calculateScore";
import {
  CriterionKinds,
  IScoresAction,
  IScoresState,
} from "../utils/Interfaces";

interface IndividualScoresProps {
  tasteWeight: string;
  valueForMoneyWeight: string;
  healthinessWeight: string;
  firstFactorName: string;
  secondFactorName: string;
  thirdFactorName: string;
}
export default function IndividualScores({
  tasteWeight,
  valueForMoneyWeight,
  healthinessWeight,
  firstFactorName,
  secondFactorName,
  thirdFactorName,
}: IndividualScoresProps): JSX.Element {
  const [state, dispatch] = useReducer(scoreReducer, {
    tasteScore: "0",
    valueForMoneyScore: "0",
    healthinessScore: "0",
  });

  function scoreReducer(state: IScoresState, action: IScoresAction) {
    const { type, newScore } = action;
    switch (type) {
      case CriterionKinds.TASTE:
        return {
          ...state,
          tasteScore: newScore,
        };
      case CriterionKinds.VALUE_FOR_MONEY:
        return {
          ...state,
          valueForMoneyScore: newScore,
        };
      case CriterionKinds.HEALTHINESS:
        return {
          ...state,
          healthinessScore: newScore,
        };
    }
  }

  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    setScore(
      calculateScore(
        state.tasteScore,
        tasteWeight,
        state.healthinessScore,
        healthinessWeight,
        state.valueForMoneyScore,
        valueForMoneyWeight
      )
    );
  }, [state, tasteWeight, healthinessWeight, valueForMoneyWeight]);

  return (
    <div>
      <div>
        {firstFactorName} score: {state.tasteScore}
        <input
          className="nodrag"
          type="range"
          id="taste"
          name="taste"
          min="0"
          max="100"
          onChange={(e) =>
            dispatch({ type: CriterionKinds.TASTE, newScore: e.target.value })
          }
        ></input>
      </div>
      <div>
        {secondFactorName} score: {state.valueForMoneyScore}
        <input
          className="nodrag"
          type="range"
          id="value"
          name="value"
          min="0"
          max="100"
          onChange={(e) =>
            dispatch({
              type: CriterionKinds.VALUE_FOR_MONEY,
              newScore: e.target.value,
            })
          }
        ></input>
      </div>
      <div>
        {thirdFactorName} score: {state.healthinessScore}
        <input
          className="nodrag"
          type="range"
          id="healthiness"
          name="healthiness"
          min="0"
          max="100"
          onChange={(e) =>
            dispatch({
              type: CriterionKinds.HEALTHINESS,
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
