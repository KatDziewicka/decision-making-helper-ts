export enum CriterionKinds {
  ONE = "ONE",
  TWO = "TWO",
  THREE = "THREE",
}

export interface IWeightsAction {
  type: CriterionKinds;
  newWeight: string;
}

export interface IWeightsState {
  firstFactorWeight: string;
  secondFactorWeight: string;
  thirdFactorWeight: string;
}

export interface IScoresAction {
  type: CriterionKinds;
  newScore: string;
}

export interface IScoresState {
  firstFactorScore: string;
  secondFactorScore: string;
  thirdFactorScore: string;
}

export interface IInputState {
  1: string;
  2: string;
  3: string;
}

export interface IInputAction {
  type: string;
  newInputName: string;
}
