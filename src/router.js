import { Router } from 'express'
import shelterController from './resources/shelter/shelter.controllers'
import animalController from './resources/animal/animal.controllers'

const router = Router()

// /api/shelter
/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
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
