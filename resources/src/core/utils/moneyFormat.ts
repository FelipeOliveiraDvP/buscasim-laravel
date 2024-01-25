export function moneyFormat(value: number): string {
  return new Intl.NumberFormat('pt_BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
