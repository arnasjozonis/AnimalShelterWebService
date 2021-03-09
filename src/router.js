import { Router } from 'express'
import shelterController from './resources/shelter/shelter.controllers'
import animalController from './resources/animal/animal.controllers'

const router = Router()

// /api/shelter
router
  .route('/')
  .get(shelterController.getAll)
  .post(shelterController.addOne)

// /api/shelter/:id
router
  .route('/:id')
  .get(shelterController.getOne)
  .put(shelterController.updateOne)
  .delete(shelterController.deleteOne)

// /api/shelter/:id/animal
router
  .route('/:id/animal')
  .get(animalController.getAll)
  .post(animalController.addOne)

// /api/shelter/:id/animal/:animalId
router
  .route('/:id/animal/:animalId')
  .get(animalController.getOne)
  .put(animalController.updateOne)
  .delete(animalController.deleteOne)

export default router
