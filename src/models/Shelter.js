/**
 * @typedef Shelter
 * @property {integer} id
 * @property {string} name.required
 * @property {string} location.required
 * @property {string} description
 * @property {Array.<Animal>} animals
 * @property {Array.<Event>} animals
 */
export function Shelter({ id, name, description, location, animals, events }) {
  return {
    id,
    name,
    description: description || 'No description',
    location,
    animals: animals || [],
    events: events || []
  }
}
