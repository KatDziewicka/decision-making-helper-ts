export function calculateScore(
  firstScore: string,
  firstWeight: string,
  secondScore: string,
  secondWeight: string,
  thirdScore: string,
  thirdWeight: string
): number {
  if (
    parseInt(firstWeight) === 0 ||
    parseInt(secondWeight) === 0 ||
    parseInt(thirdWeight) === 0
  ) {
    return 0;
  }

  return (
    (parseInt(firstScore) * parseInt(firstWeight) +
      parseInt(secondScore) * parseInt(secondWeight) +
      parseInt(thirdScore) * parseInt(thirdWeight)) /
    (parseInt(firstWeight) +
      parseInt(secondWeight) + parseInt(thirdWeight))
  );
}
