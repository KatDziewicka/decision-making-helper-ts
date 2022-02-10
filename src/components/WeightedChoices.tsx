import { useReducer } from "react";
import ReactFlow from "react-flow-renderer";
import IndividualScores from "./IndividualScores";
import "../styles/Flow.css"
import { CriterionKinds, IWeightsAction, IWeightsState, IChoicesState, IChoicesAction, Choices } from "../utils/Interfaces";

function weightReducer(state: IWeightsState, action: IWeightsAction) {
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

function choicesReducer(state: IChoicesState, action: IChoicesAction) {
  const { type, newChoiceName } = action;
  switch (type) {
    case "first":
      return {
        ...state,
        1: newChoiceName,
      };
    case "second":
      return {
        ...state,
        2: newChoiceName,
      };
    case "third":
      return {
        ...state,
        3: newChoiceName,
      };
    default:
      return {
        ...state
      }
  }
}



export default function WeightedChoices(): JSX.Element {
  
 
const [choicesState, choicesDispatch] = useReducer(choicesReducer, {
    1: "Lasagne",
    2: "Chicken Wings",
    3: "Salad"
  });


  const [state, dispatch] = useReducer(weightReducer, {
    tasteWeight: "0",
    valueForMoneyWeight: "0",
    healthinessWeight: "0",
  });

  const options = Object.keys(choicesState).map((choice, index) => ({
    id: `${index}`,
    data: {label: (<div key={index}>
    <h3>{choice}</h3>
    <input onChange={(e)=>{
      choicesDispatch({
        type: choice,
        newChoiceName: e.target.value
      })
    }}></input>
    <IndividualScores tasteWeight={state.tasteWeight} valueForMoneyWeight={state.valueForMoneyWeight} healthinessWeight={state.healthinessWeight}/>
    </div>)},
    position: {x: 250+250*index, y: 200}}))

    const weights = [
      {id: "w1",
    data: {label:
    (<div>
        Taste Weight: {state.tasteWeight}
        <input
          className="nodrag"
          type="range"
          id="taste"
          name="taste"
          min="0"
          max="5"
          onChange={(e) =>
            dispatch({ type: CriterionKinds.TASTE, newWeight: e.target.value })
          }
        ></input>
      </div>)},
      position: {x: 250, y: 5}},
      {id: "w2",
      data: {label:
      (<div>
        Value for money weight: {state.valueForMoneyWeight}
        <input
        className="nodrag"
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
      </div>)},
        position: {x: 500, y: 5}},
        {id: "w3",
      data: {label:
      (<div>
        Healthiness weight: {state.healthinessWeight}
        <input
          className="nodrag"
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
      </div>)},
        position: {x: 750, y: 5}}]


      const elements = options.concat(weights);


  console.log(state);
  return (      

  <div className="react-flow-background">
  <ReactFlow elements={elements} />
  </div>
  )
}

