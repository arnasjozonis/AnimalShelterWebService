import { crud } from '../../db/db'

export default {
  getOne: async (req, res, next) => {
    try {
      const result = await crud.getAnimal(req.params?.animalId)
      if (!result) {
        res.status(404).end('Not found')
      } else {
        res.status(200).json({ data: result })
      }
    } catch (e) {
      res.status(500).end(e?.toString())
    }
  },
  addOne: async (req, res, next) => {
    try {
      const result = await crud.addAnimal(req.body)
      if (!result) {
        return res.status(400).end()
      } else {
        res.status(200).json({ data: result })
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
        res.status(200).json({ data: result })
      }
    } catch (e) {
      res.status(500).end(e?.toString())
    }
  },
  updateOne: async (req, res) => {
    try {
      const result = await crud.updateAnimal(req.body)
      if (result) {
        res.status(200).end()
      } else {
        res.status(400).end('Bad request')
      }
    } catch (e) {
      res.status(500).end(e?.toString())
    }
  },
  deleteOne: async (req, res) => {
    try {
      const result = await crud.deleteAnimal(req.params?.animalId)
      console.log(result)
      return res.status(200).end('Deleted')
    } catch (e) {
      res.status(500).end(e?.toString())
    }
  }
}
