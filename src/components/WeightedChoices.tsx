import { useReducer } from "react";
import IndividualScores from "./IndividualScores";

enum CriterionKinds {
  TASTE = "TASTE",
  VALUE_FOR_MONEY = "VALUE FOR MONEY",
  HEALTHINESS = "HEALTHINESS",
}

interface WeightsAction {
  type: CriterionKinds;
  newWeight: string;
}

interface WeightsState {
  tasteWeight: string;
  valueForMoneyWeight: string;
  healthinessWeight: string;
}

function weightReducer(state: WeightsState, action: WeightsAction) {
  const { type, newWeight } = action;
  switch (type) {
    case CriterionKinds.TASTE:
      return {
        ...state,
        tasteWeight: newWeight,
      };
    case CriterionKinds.VALUE_FOR_MONEY:
      return {
        ...state,
        valueForMoneyWeight: newWeight,
      };
    case CriterionKinds.HEALTHINESS:
      return {
        ...state,
        healthinessWeight: newWeight,
      };
  }
}

interface IndividualWeightsProps {
  tasteWeight: number;
}

export default function WeightedChoices(): JSX.Element {
  const choices = ["Lasagne", "Chicken Wings", "Salad"];

  const [state, dispatch] = useReducer(weightReducer, {
    tasteWeight: "0",
    valueForMoneyWeight: "0",
    healthinessWeight: "0",
  });

  console.log(state);
  return (
    <div>
      <div>
        Taste Weight: {state.tasteWeight}
        <input
          type="range"
          id="taste"
          name="taste"
          min="0"
          max="5"
          onChange={(e) =>
            dispatch({ type: CriterionKinds.TASTE, newWeight: e.target.value })
          }
        ></input>
      </div>
      <div>
        Value for money weight: {state.valueForMoneyWeight}
        <input
          type="range"
          id="value"
          name="value"
          min="0"
          max="5"
          onChange={(e) =>
            dispatch({
              type: CriterionKinds.VALUE_FOR_MONEY,
              newWeight: e.target.value,
            })
          }
        ></input>
      </div>
      <div>
        Healthiness weight: {state.healthinessWeight}
        <input
          type="range"
          id="healthiness"
          name="healthiness"
          min="0"
          max="5"
          onChange={(e) =>
            dispatch({
              type: CriterionKinds.HEALTHINESS,
              newWeight: e.target.value,
            })
          }
        ></input>
      </div>
      <div>
        {choices.map((choice, index) => (
          <div key={index}>
            <h3>{choice}</h3>
            <IndividualScores
              tasteWeight={state.tasteWeight}
              valueForMoneyWeight={state.valueForMoneyWeight}
              healthinessWeight={state.healthinessWeight}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

