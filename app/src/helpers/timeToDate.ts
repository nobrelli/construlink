// Source: https://stackoverflow.com/questions/35978089/how-to-convert-730-am-time-to-javascript-date-type

export function timeToDate(time: string) {
  const date = new Date()
  const parts = time.match(/(\d+)\:(\d+) (\w+)/) ?? []
  const hours = /am/i.test(parts[3])
    ? Number.parseInt(parts[1], 10)
    : Number.parseInt(parts[1], 10) + 12
  const minutes = Number.parseInt(parts[2], 10)

  date.setHours(hours, minutes, 0, 0)

  return date
}
