import IndividualScores from "./IndividualScores"

export default function Choices():JSX.Element {
    const choices = ["Lasagne", "Chicken Wings", "Salad"]
    
    return <>
     {choices.map((choice, index) => <div key={index}>
         <h3>{choice}</h3>
         <IndividualScores />
     </div>)}
    </>
}