import { useEffect, useReducer, useState } from "react";
import { calculateScore } from "../utils/calculateScore";

enum CriterionKinds {
  TASTE = "TASTE",
  VALUE_FOR_MONEY = "VALUE FOR MONEY",
  HEALTHINESS = "HEALTHINESS",
}

interface ScoresAction {
  type: CriterionKinds;
  newScore: string;
}

interface ScoresState {
  tasteScore: string;
  valueForMoneyScore: string;
  healthinessScore: string;
}

function scoreReducer(state: ScoresState, action: ScoresAction) {
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

interface IndividualScoresProps {
  tasteWeight: string;
  valueForMoneyWeight: string;
  healthinessWeight: string;
}
export default function IndividualScores({
  tasteWeight,
  valueForMoneyWeight,
  healthinessWeight,
}: IndividualScoresProps): JSX.Element {
  const [state, dispatch] = useReducer(scoreReducer, {
    tasteScore: "0",
    valueForMoneyScore: "0",
    healthinessScore: "0",
  });

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

  const elements = [
    { id: "e1-2", source: "1", target: "2", animated: true, label: "Taste" },
    { id: "e1-2", source: "3", target: "4", animated: true, label: "Value for money" },
    { id: "e1-2", source: "5", target: "6", animated: true, label: "Healthiness"}
  ];

  
  return (
    <div>
      <div>
        Taste score: {state.tasteScore}
        <input
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
        Value for money score: {state.valueForMoneyScore}
        <input
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
        Healthiness score: {state.healthinessScore}
        <input
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
