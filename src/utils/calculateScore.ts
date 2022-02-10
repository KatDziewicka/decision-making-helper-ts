export function calculateScore(
  tasteScore: string,
  tasteWeight: string,
  healthinessScore: string,
  healthinessWeight: string,
  valueForMoneyScore: string,
  valueForMoneyWeight: string
): number {
  if (
    parseInt(tasteWeight) === 0 ||
    parseInt(healthinessWeight) === 0 ||
    parseInt(valueForMoneyWeight) === 0
  ) {
    return 0;
  }

  return (
    (parseInt(tasteScore) * parseInt(tasteWeight) +
      parseInt(healthinessScore) * parseInt(healthinessWeight) +
      parseInt(valueForMoneyScore) * parseInt(valueForMoneyWeight)) /
    (parseInt(tasteWeight) +
      parseInt(valueForMoneyWeight) +
      parseInt(healthinessWeight))
  );
}
