/**
 * @typedef Animal
 * @property {integer} id
 * @property {integer} shelterID
 * @property {string} name.required
 * @property {string} type.required
 * @property {string} description
 */
export function Shelterl({ id, name, description, type, shelterID }) {
  return {
    id,
    shelterID,
    name,
    description: description || 'No description',
    type
  }
}
