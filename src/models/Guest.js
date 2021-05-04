/**
 * @typedef Guest
 * @property {string} name.required
 * @property {string} surname.required
 * @property {string} email.required
 */
export function Guest({ id, name, surname, email }) {
  return {
    id,
    name,
    surname,
    email
  }
}
