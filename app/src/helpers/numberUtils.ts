export function formatMoney(value: number) {
  const PHP = Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  })

  return PHP.format(value)
}
