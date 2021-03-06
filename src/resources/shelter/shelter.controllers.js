import { crud } from '../../db/db'

export default {
  getOne: async (req, res) => {
    try {
      const result = await crud.getShelter(req.params?.id)
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
      const result = await crud.addShelter(req.body)
      if (result.code) {
        if (result.code === 206) {
          const partial = await crud.getShelter(result?.shelterID)
          res.set('x-location', `/shelters/${result.id}`)
          return res.status(206).json(partial)
        } else {
          return res.status(result.code).end()
        }
      } else if (result) {
        res.set('x-location', `/shelters/${result.id}`)
        return res.status(200).json(result)
      } else {
        return res.status(400).end()
      }
    } catch (e) {
      res.status(500).end(e?.toString())
    }
  },
  getAll: async (_, res) => {
    try {
      const result = await crud.getShelters()
      res.status(200).json(result)
    } catch (e) {
      res.status(500).end(e?.toString())
    }
  },
  updateOne: async (req, res) => {
    try {
      const result = await crud.updateShelter({
        ...req.body,
        id: req.params?.id
      })
      if (result && !result.code) {
        res.status(200).json(result)
      } else {
        res.status(result.code).end()
      }
    } catch (e) {
      res.status(500).end(e?.toString())
    }
  },
  deleteOne: async (req, res) => {
    try {
      const result = await crud.deleteShelter(req.params?.id)
      if (result?.changes > 0) {
        res.status(204).end('Deleted')
      } else {
        res.status(400).end()
      }
    } catch (e) {
      res.status(500).end(e?.toString())
    }
  }
}
