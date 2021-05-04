/**
 * @typedef Event
 * @property {string} name.required
 * @property {string} description.required
 * @property {string} location.required
 * @property {string} date.required
 * @property {string} startTime.required
 * @property {Array.<Guest>} guests
 */
export function Event({
  id,
  name,
  description,
  location,
  date,
  startTime,
  guests
}) {
  return {
    id,
    description,
    name,
    date,
    location,
    startTime,
    guests: guests || []
  }
}
