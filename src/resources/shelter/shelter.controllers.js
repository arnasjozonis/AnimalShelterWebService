import { crud } from '../../db/db'

export default {
  getOne: async (req, res, next) => {
    try {
      const result = await crud.getShelter(req.params?.id)
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
      const result = await crud.addShelter(req.body)
      if (!result) {
        res.status(400).end()
      } else {
        res.status(200).json({ data: result })
      }
    } catch (e) {
      res.status(500).end(e?.toString())
    }
  },
  getAll: async (req, res, next) => {
    try {
      const result = await crud.getShelters()
      res.status(200).json({ data: result })
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
      if (result.changes > 0) {
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
      const result = await crud.deleteShelter(req.params?.id)
      if (result?.changes > 0) {
        res.status(200).end('deleted')
      } else {
        res.status(400).end('bad request')
      }
    } catch (e) {
      res.status(500).end(e?.toString())
    }
  }
}
