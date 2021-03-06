import { crud } from '../../db/db'

export default {
  getOne: async (req, res) => {
    try {
      const result = await crud.getAnimal(req.params?.animalId)
      if (!result) {
        res.status(404).end('Not found')
      } else {
        res.status(200).json(result)
      }
    } catch (e) {
      res.status(500).end(e?.toString())
    }
  },
  addOne: async (req, res) => {
    try {
      const result = await crud.addAnimal({
        ...req.body,
        shelterID: req.params?.id
      })
      if (result.code) {
        return res.status(result.code).end()
      } else {
        res.set(
          'x-location',
          `/shelters/${result.shelterID}/animals/${result.id}`
        )
        res.status(200).json(result)
      }
    } catch (e) {
      res.status(500).end(e?.toString())
    }
  },
  getAll: async (req, res, next) => {
    try {
      const result = await crud.getShelterAnimals(req.params?.id)
      if (!result) {
        res.status(404).end('Not found')
      } else {
        res.status(200).json(result)
      }
    } catch (e) {
      res.status(500).end(e?.toString())
    }
  },
  updateOne: async (req, res) => {
    try {
      const result = await crud.updateAnimal({
        ...req.body,
        shelterID: req.params?.id,
        id: req.params?.animalId
      })
      if (result && !result.code) {
        res.status(200).json(result)
      } else {
        res.status(400).end('Bad request')
      }
    } catch (e) {
      res.status(500).end(e?.toString())
    }
  },
  deleteOne: async (req, res) => {
    try {
      console.log(req.params)
      const result = await crud.deleteAnimal(
        req.params?.id,
        req.params?.animalId
      )
      if (result.changes > 0) {
        return res.status(204).end('Deleted')
      } else {
        return res.status(400).end()
      }
    } catch (e) {
      res.status(500).end(e?.toString())
    }
  }
}
