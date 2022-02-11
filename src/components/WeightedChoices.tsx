import { useReducer } from "react";
import ReactFlow, {
  Position,
  Background,
  BackgroundVariant,
} from "react-flow-renderer";
import IndividualScores from "./IndividualScores";
import "../styles/Flow.css";
import "../styles/WeightedChoices.css";
import {
  CriterionKinds,
  IWeightsAction,
  IWeightsState,
  IInputState,
  IInputAction,
} from "../utils/Interfaces";

export default function WeightedChoices(): JSX.Element {
  const [weightState, weightDispatch] = useReducer(weightReducer, {
    firstFactorWeight: "1",
    secondFactorWeight: "1",
    thirdFactorWeight: "1",
  });
  //handle the changes in weighting of attributes
  function weightReducer(state: IWeightsState, action: IWeightsAction) {
    const { type, newWeight } = action;
    switch (type) {
      case CriterionKinds.ONE:
        return {
          ...state,
          firstFactorWeight: newWeight,
        };
      case CriterionKinds.TWO:
        return {
          ...state,
          secondFactorWeight: newWeight,
        };
      case CriterionKinds.THREE:
        return {
          ...state,
          thirdFactorWeight: newWeight,
        };
    }
  }

  const [choicesState, choicesDispatch] = useReducer(choicesReducer, {
    1: "Option 1",
    2: "Option 2",
    3: "Option 3",
  });

  //handle changes of choice - in preparation for creating a node with the winning choice
  function choicesReducer(state: IInputState, action: IInputAction) {
    const { type, newInputName } = action;
    switch (type) {
      case "first":
        return {
          ...state,
          1: newInputName,
        };
      case "second":
        return {
          ...state,
          2: newInputName,
        };
      case "third":
        return {
          ...state,
          3: newInputName,
        };
      default:
        return {
          ...state,
        };
    }
  }

  const [factorsState, factorsDispatch] = useReducer(factorsReducer, {
    1: "Factor 1",
    2: "Factor 2",
    3: "Factor 3",
  });

  //handle changes of choice - in preparation for creating a node with the winning choice
  function factorsReducer(state: IInputState, action: IInputAction) {
    const { type, newInputName } = action;
    switch (type) {
      case "first":
        return {
          ...state,
          1: newInputName,
        };
      case "second":
        return {
          ...state,
          2: newInputName,
        };
      case "third":
        return {
          ...state,
          3: newInputName,
        };
      default:
        return {
          ...state,
        };
    }
  }

  //array with info on "edges" - the connectors in React Flow
  const edges = [
    { id: "e1", source: "0", target: "w1" },
    { id: "e2", source: "0", target: "w2" },
    { id: "e3", source: "0", target: "w3" },
    { id: "e4", source: "1", target: "w1" },
    { id: "e5", source: "1", target: "w2" },
    { id: "e6", source: "1", target: "w3" },
    { id: "e7", source: "2", target: "w1" },
    { id: "e8", source: "2", target: "w2" },
    { id: "e9", source: "2", target: "w3" },
  ];

  //displaying options along with scores and sliders
  const options = Object.keys(choicesState).map((choice, index) => ({
    id: `${index}`,
    data: {
      label: (
        <div key={index} className="choice-node">
          <h3>Option {choice}</h3>
          <input
            className="choice-input"
            placeholder="I might choose..."
            onChange={(e) => {
              choicesDispatch({
                type: choice,
                newInputName: e.target.value,
              });
            }}
          ></input>
          <IndividualScores
            firstFactorName={factorsState[1]}
            secondFactorName={factorsState[2]}
            thirdFactorName={factorsState[3]}
            firstFactorWeight={weightState.firstFactorWeight}
            secondFactorWeight={weightState.secondFactorWeight}
            thirdFactorWeight={weightState.thirdFactorWeight}
          />
        </div>
      ),
    },
    sourcePosition: Position.Top,
    position: { x: 250 + 250 * index, y: 200 },
  }));

  const weights = [
    {
      id: "w1",
      data: {
        label: (
          <div>
            <input
              className="factor-input"
              placeholder="Factor 1"
              onChange={(e) =>
                factorsDispatch({
                  type: "first",
                  newInputName: e.target.value,
                })
              }
            ></input>
            <p>Weight: {weightState.firstFactorWeight}</p>
            <input
              className="nodrag"
              type="range"
              id="taste"
              name="taste"
              min="1"
              max="5"
              onChange={(e) =>
                weightDispatch({
                  type: CriterionKinds.ONE,
                  newWeight: e.target.value,
                })
              }
            ></input>
          </div>
        ),
      },
      targetPosition: Position.Bottom,
      position: { x: 250, y: 5 },
    },
    {
      id: "w2",
      data: {
        label: (
          <div>
            <input
              className="factor-input"
              placeholder="Factor 1"
              onChange={(e) =>
                factorsDispatch({
                  type: "second",
                  newInputName: e.target.value,
                })
              }
            ></input>
            <p>Weight: {weightState.secondFactorWeight}</p>
            <input
              className="nodrag"
              type="range"
              id="value"
              name="value"
              min="1"
              max="5"
              onChange={(e) =>
                weightDispatch({
                  type: CriterionKinds.TWO,
                  newWeight: e.target.value,
                })
              }
            ></input>
          </div>
        ),
      },
      targetPosition: Position.Bottom,
      position: { x: 500, y: 5 },
    },
    {
      id: "w3",
      data: {
        label: (
          <div>
            <input
              className="factor-input"
              placeholder="Factor 1"
              onChange={(e) =>
                factorsDispatch({
                  type: "third",
                  newInputName: e.target.value,
                })
              }
            ></input>
            <p>Weight: {weightState.thirdFactorWeight}</p>
            <input
              className="nodrag"
              type="range"
              id="healthiness"
              name="healthiness"
              min="1"
              max="5"
              onChange={(e) =>
                weightDispatch({
                  type: CriterionKinds.THREE,
                  newWeight: e.target.value,
                })
              }
            ></input>
          </div>
        ),
      },
      targetPosition: Position.Bottom,
      position: { x: 750, y: 5 },
    },
  ];

  const elements = [...edges, ...options, ...weights];

  return (
    <div className="react-flow-background">
      <ReactFlow className="flow" elements={elements}>
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={2}
          color="#99b3ff"
        />
      </ReactFlow>
    </div>
  );
}
