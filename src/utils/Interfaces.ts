export enum CriterionKinds {
    TASTE = "TASTE",
    VALUE_FOR_MONEY = "VALUE FOR MONEY",
    HEALTHINESS = "HEALTHINESS",
  }

export  enum Categories {
    LASAGNE = "LASAGNE",
    CHICKEN_WINGS = "CHICKEN WINGS",
    SALAD = "SALAD",
  }

export enum Choices {
    first="FIRST",
    second="SECOND",
    third="THIRD"
}
export interface IWeightsAction {
    type: CriterionKinds;
    newWeight: string;
  }
  
 export interface IWeightsState {
    tasteWeight: string;
    valueForMoneyWeight: string;
    healthinessWeight: string;
  }

export interface IScoresAction {
    type: CriterionKinds;
    newScore: string;
  }
  
export interface IScoresState {
    tasteScore: string;
    valueForMoneyScore: string;
    healthinessScore: string;
  }

export interface IAvgScoreAction {
    type: Categories;
    newAvgScore: number;
  }
  
export interface IAvgScoreState {
    tasteAvgScore: number;
    valueForMoneyAvgScore: number;
    healthinessAvgScore: number;
  }

export interface IChoicesState {
    1: string,
    2: string,
    3: string
}

export interface IChoicesAction {
    type: string,
    newChoiceName: string
}