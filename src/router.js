import { Router } from 'express'
import shelterController from './resources/shelter/shelter.controllers'
import animalController from './resources/animal/animal.controllers'
import eventsController from './resources/events/events.controllers'

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
   */
  .put(shelterController.updateOne)
  /**
   * @group Shelter
   * @route delete /shelters/{id}
   * @param {integer} id.path.required
   * @returns {Text} 204 - Delete confirmation
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
   */
  .get(animalController.getAll)
  /**
   * @group Shelter animals
   * @route POST /shelters/{id}/animals
   * @param {integer} id.path.required Shelter id
   * @param {Animal.model} Animal.body
   * @returns {Animal.model} 200 - Newly added animal
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
   */
  .get(animalController.getOne)
  /**
   * @group Animal
   * @route put /shelters/{id}/animals/{animalId}
   * @param {integer} id.path.required Shelter id
   * @param {integer} animalId.path.required Animal id
   * @param {Animal.model} Animal.body
   * @returns {Animal.model} 200 - Updated animal data
   */
  .put(animalController.updateOne)
  /**
   * @group Animal
   * @route delete /shelters/{id}/animals/{animalId}
   * @param {integer} id.path.required Shelter id
   * @param {integer} animalId.path.required Animal id
   * @returns {Text} 204 - Delete confirmation
   */
  .delete(animalController.deleteOne)

// /api/shelters/:id/events
router
  .route('/:id/events')
  /**
   * @group Shelter events
   * @route get /shelters/{id}/events
   * @param {integer} id.path.required Shelter id
   * @returns {Array.<Event>} 202 - List of all events planned for shelter
   */
  .get(eventsController.getAll)
  /**
   * @group Shelter events
   * @route POST /shelters/{id}/events
   * @param {integer} id.path.required Shelter id
   * @param {Event.model} Event.body
   * @returns {Event.model} 200 - Created event
   */
  .post(eventsController.addOne)

// /api/shelters/:id/events/:eventId
router
  .route('/:id/events/:eventId')
  /**
   * @group Shelter events
   * @route get /shelters/{id}/events/{eventId}
   * @param {integer} id.path.required Shelter id
   * * @param {integer} eventId.path.required Event id
   * @returns {Event.model} 200 - Event info
   */
  .get(eventsController.getOne)

export default router
