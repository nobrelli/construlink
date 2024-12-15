export function joinNames(first: string, last: string) {
  return `${first} ${last}`
}

export function capitalizeFirst(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function truncateString(value: string, maxLength: number) {
  return value.length > maxLength
    ? `${value.slice(0, maxLength - 3)}...`
    : value
}
