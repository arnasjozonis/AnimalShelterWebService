import { Router } from 'express'
import shelterController from './resources/shelter/shelter.controllers'
import animalController from './resources/animal/animal.controllers'

const router = Router()

// /api/shelters

router
  .route('/')
  /**
   * @group All shelters
   * @route GET /shelters
   * @returns {Array.<Shelter>} 200 - An array shelters
   * @returns {Error}  default - Unexpected error
   */
  .get(shelterController.getAll)
  /**
   * @group All shelters
   * @route POST /shelters
   * @param {Shelter.model} Shelter.body
   * @returns {Shelter.model} 200 - Newly created shelter data
   * @returns {Error}  default - Unexpected error
   */
  .post(shelterController.addOne)

// /api/shelters/:id
router
  .route('/:id')
  /**
   * @group Shelter
   * @route get /shelters/{id}
   * @param {integer} id.path.required
   * @returns {Shelter.model} 200 - Shelter data for requested id
   * @returns {Error}  default - Unexpected error
   */
  .get(shelterController.getOne)
  /**
   * @group Shelter
   * @route put /shelters/{id}
   * @param {integer} id.path.required
   * @param {Shelter.model} Shelter.body
   * @returns {Shelter.model} 200 - Updated shelter model
   * @returns {Error}  default - Unexpected error
   */
  .put(shelterController.updateOne)
  /**
   * @group Shelter
   * @route delete /shelters/{id}
   * @param {integer} id.path.required
   * @returns {Text} 206 - Delete confirmation
   * @returns {Error}  default - Unexpected error
   */
  .delete(shelterController.deleteOne)

// /api/shelters/:id/animals
router
  .route('/:id/animals')
  /**
   * @group Shelter animals
   * @route get /shelters/{id}/animals
   * @param {integer} id.path.required Shelter id
   * @returns {Array.<Animal>} 202 - List of all animals in shelter
   * @returns {Error}  default - Unexpected error
   */
  .get(animalController.getAll)
  /**
   * @group Shelter animals
   * @route POST /shelters/{id}/animals
   * @param {Animal.model} Animal.body
   * @returns {Animal.model} 200 - Newly added animal
   * @returns {Error}  default - Unexpected error
   */
  .post(animalController.addOne)

// /api/shelters/:id/animal/:animalId
router
  .route('/:id/animals/:animalId')
  /**
   * @group Animal
   * @route get /shelters/{id}/animals/{animalId}
   * @param {integer} id.path.required Shelter id
   * @param {integer} animalId.path.required Animal id
   * @returns {Animal.model} 200 - Animal data
   * @returns {Error}  default - Unexpected error
   */
  .get(animalController.getOne)
  /**
   * @group Animal
   * @route put /shelters/{id}/animals/{animalId}
   * @param {integer} id.path.required Shelter id
   * @param {integer} animalId.path.required Animal id
   * @param {Animal.model} Animal.body
   * @returns {Animal.model} 200 - Updated animal data
   * @returns {Error}  default - Unexpected error
   */
  .put(animalController.updateOne)
  /**
   * @group Animal
   * @route delete /shelters/{id}/animals/{animalId}
   * @param {integer} id.path.required Shelter id
   * @param {integer} animalId.path.required Animal id
   * @returns {Text} 206 - Delete confirmation
   * @returns {Error}  default - Unexpected error
   */
  .delete(animalController.deleteOne)

export default router
