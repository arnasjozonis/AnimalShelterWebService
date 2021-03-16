import sqlite from 'sqlite3'
import path from 'path'
import fs from 'fs'
import util from 'util'
import { initDb } from './seed'

var SQL

export async function connect(withSeed = true) {
  const DB_PATH = path.join(__dirname, 'shelter.db')
  const DB_SQL_PATH = path.join(__dirname, 'shelterdb.sql')
  const db = new sqlite.Database(DB_PATH)

  SQL = {
    run(...args) {
      return new Promise(function c(resolve, reject) {
        db.run(...args, function onResult(err) {
          if (err) reject(err)
          else resolve(this)
        })
      })
    },
    get: util.promisify(db.get.bind(db)),
    all: util.promisify(db.all.bind(db)),
    exec: util.promisify(db.exec.bind(db))
  }

  const initSQL = fs.readFileSync(DB_SQL_PATH, 'utf-8')
  await SQL.exec(initSQL)
  if (withSeed) {
    await Promise.all(
      initDb.map(async (item, idx) => {
        await addShelter(item)
        await Promise.all(
          item.animals.map(async animal =>
            addAnimal({ ...animal, shelterID: idx + 1 })
          )
        )
      })
    )
  }
}

const addShelter = async ({ name, location, description, animals }) => {
  try {
    const result = await SQL.run(
      `
        INSERT INTO Shelter (name, location, description) VALUES (?, ?, ?)
      `,
      name,
      location,
      description
    )
    if (result && result.lastID) {
      const shelterID = result.lastID
      if (animals?.length) {
        try {
          const addedAnimals = await Promise.all(
            animals.map(async animal => addAnimal({ ...animal, shelterID }))
          )
          if (addedAnimals?.find(({ code }) => code)) {
            return { code: 206, shelterID }
          }
          return getShelter(shelterID)
        } catch (e) {
          return { code: 206, shelterID }
        }
      }
    }
  } catch (e) {
    if (e.code === 'SQLITE_CONSTRAINT') {
      return { code: 400 }
    } else {
      return { code: 500 }
    }
  }
}

const getShelter = async id => {
  const result = await SQL.get(
    `
      SELECT id, name, location, description FROM Shelter WHERE id = ?
    `,
    id
  )
  if (result != null) {
    const animals = await getShelterAnimals(id)
    return { ...result, animals }
  }
  return false
}

const addAnimal = async ({ type, age, name, description, shelterID }) => {
  let result = await SQL.get(
    `
      SELECT id FROM Shelter WHERE id = ?
    `,
    shelterID
  )
  if (result && result.id) {
    try {
      result = await SQL.run(
        `
          INSERT INTO Animal (type,age,name,description,shelterID) VALUES (?,?,?,?,?)
        `,
        type,
        age,
        name,
        description,
        shelterID
      )
      if (result != null && result.changes > 0 && result.lastID) {
        return await getAnimal(result.lastID)
      }
    } catch (e) {
      return { code: 400 }
    }
  }
  return { code: 404 }
}

const getShelters = async () => {
  let result = await SQL.all(
    `
      SELECT * FROM Shelter
    `
  )
  const appendedResult = await Promise.all(
    result.map(async item => {
      const animals = await getShelterAnimals(item.id)
      return { ...item, animals }
    })
  )
  return appendedResult
}

const getShelterAnimals = async shelterID => {
  let result = await SQL.all(
    `
      SELECT * FROM Animal WHERE shelterID = ?
    `,
    shelterID
  )
  return result.length ? result : []
}

const getAnimal = async animalID =>
  SQL.get(
    `
    SELECT * FROM Animal WHERE id = ?
  `,
    animalID
  )

const updateAnimal = async ({ id, type, description, age, name }) => {
  const existing = await getAnimal(id)
  if (existing != null) {
    try {
      const result = await SQL.run(
        `
          UPDATE Animal
          SET type = ?, description = ?, age = ?, name = ?
          WHERE id = ?
        `,
        type,
        description,
        age,
        name,
        id
      )
      if (result.changes > 0) {
        return getAnimal(id)
      }
    } catch (e) {
      return { code: 400 }
    }
  }
}

const updateShelter = async ({ id, location, description, name }) => {
  const existing = await getShelter(id)
  if (existing != null) {
    try {
      const result = await SQL.run(
        `
          UPDATE Shelter
          SET location = ?, description = ?, name = ?
          WHERE id = ?
        `,
        location,
        description,
        name,
        id
      )
      if (result.changes > 0) {
        return await getShelter(id)
      } else {
        return { code: 400 }
      }
    } catch (e) {
      return { code: 400 }
    }
  } else {
    return { code: 404 }
  }
}

const deleteAnimal = async (shelterId, animalId) =>
  SQL.run(
    `
    DELETE FROM Animal WHERE id = ? AND shelterID = ?
  `,
    animalId,
    shelterId
  )

const deleteShelter = async id =>
  SQL.run(
    `
    DELETE FROM Shelter WHERE id = ?
  `,
    id
  )

export const crud = {
  addShelter,
  addAnimal,
  getShelter,
  getShelters,
  getShelterAnimals,
  getAnimal,
  updateAnimal,
  updateShelter,
  deleteAnimal,
  deleteShelter
}
