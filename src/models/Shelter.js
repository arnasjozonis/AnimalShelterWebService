/**
 * @typedef Shelter
 * @property {integer} id
 * @property {string} name.required
 * @property {string} location.required
 * @property {string} description
 * @property {Array.<Animal>} animals
 */
export function Shelterl({ id, name, description, location, animals }) {
  return {
    id,
    name,
    description: description || 'No description',
    location,
    animals: animals || []
  }
}
