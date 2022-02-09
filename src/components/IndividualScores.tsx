import { useReducer, ReducerState } from "react"

enum CriterionKinds {
    TASTE='TASTE',
    VALUE_FOR_MONEY='VALUE FOR MONEY',
    HEALTHINESS='HEALTHINESS',
}

interface CriterionAction {
    type: CriterionKinds,
    newScore: string
}

interface CriterionState {
    tasteScore: string,
    valueForMoneyScore: string,
    healthinessScore: string
}
  

function scoreReducer(state: CriterionState, action: CriterionAction) {
    const { type, newScore } = action;
    switch(type) {
        case CriterionKinds.TASTE:
            return {
                ...state,
                tasteScore: newScore
            }
        case CriterionKinds.VALUE_FOR_MONEY:
            return {
                ...state,
                valueForMoneyScore: newScore
            }
        case CriterionKinds.HEALTHINESS:
            return {
                ...state,
                healthinessScore: newScore
            }
    }
}
export default function IndividualScores():JSX.Element {

    function calculateScore(tasteScore: string, valueForMoneyScore: string, healthinessScore: string): number {
        return (parseInt(state.tasteScore)+parseInt(state.healthinessScore)+parseInt(state.valueForMoneyScore))/3
    }
   
    const [state, dispatch] = useReducer(scoreReducer, { tasteScore: "0",
        valueForMoneyScore: "0",
        healthinessScore: "0" });
    return (
    <div>
      <div>
        Taste score: {state.tasteScore}
        <input type="range" id="taste" name="taste"
         min="0" max="100" onChange={(e)=>dispatch({type: CriterionKinds.TASTE, newScore: e.target.value})}></input>
      </div>
      <div>
        Value for money weight: {state.valueForMoneyScore}
        <input type="range" id="value" name="value"
         min="0" max="100" onChange={(e)=>dispatch({type: CriterionKinds.VALUE_FOR_MONEY, newScore: e.target.value})}></input>
      </div>
      <div>
        Healthiness weight: {state.healthinessScore}
        <input type="range" id="healthiness" name="healthiness"
         min="0" max="100" onChange={(e)=>dispatch({type: CriterionKinds.HEALTHINESS, newScore: e.target.value})}></input>
      </div>
      <div>
          <h3>Score: {calculateScore(state.tasteScore, state.valueForMoneyScore, state.healthinessScore)}</h3>
      </div>
    </div>
    );
  };
