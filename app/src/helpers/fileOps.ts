import fs from 'node:fs/promises'

export const readJsonFile = <DataType extends object>(
  path: string
): Promise<DataType> => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const data = await fs.readFile(path, { encoding: 'utf-8' })
        resolve(JSON.parse(data))
      } catch (err) {
        console.error(err)
        reject(`Cannot read file: ${path}`)
      }
    })()
  })
}

export const writeToFile = (
  path: string,
  contents: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        await fs.writeFile(path, contents)
        resolve(true)
      } catch (err) {
        console.error(err)
        reject(false)
      }
    })()
  })
}
