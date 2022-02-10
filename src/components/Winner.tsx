interface WinnerProps {
    score: number;
}
export default function Winner({score}:WinnerProps): JSX.Element {

    return <p>{score}</p>
}