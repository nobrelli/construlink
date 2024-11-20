import fs from 'node:fs/promises'

export const readJsonFile = <DataType>(path: string): Promise<DataType> => {
  return new Promise((resolve, reject) => {
    try {
      ;(async () => {
        const data = await fs.readFile(path, { encoding: 'utf-8' })
        resolve(JSON.parse(data))
      })()
    } catch (e) {
      reject(`Cannot read file: ${path}`)
    }
  })
}
