const numberFormatter = new Intl.NumberFormat('pt-PT');

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}
