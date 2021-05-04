/**
 * @typedef Animal
 * @property {integer} id
 * @property {integer} shelterID
 * @property {string} name.required
 * @property {string} type.required
 * @property {string} description
 */
export function Animal({ id, name, description, type, shelterID }) {
  return {
    id,
    shelterID,
    name,
    description: description || 'No description',
    type
  }
}
