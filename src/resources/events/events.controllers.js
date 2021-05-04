import { crud } from '../../db/db'
import fetch from 'node-fetch'

class EventsApi {
  static baseBath = 'http://localhost:5000/api/v1/'
  static getEvent = async id => fetch(`${EventsApi.baseBath}/events/${id}`)
  static getEvents = async () => fetch(`${EventsApi.baseBath}/events`)
  static addEvent = async event =>
    fetch(`${EventsApi.baseBath}/events`, {
      method: 'POST',
      data: event,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
}

export default {
  getAll: async (req, res) => {
    try {
      const shelter = await crud.getShelter(req.params?.id)
      const response = await EventsApi.getEvents()
      const allEvents = await response.json()
      const result = allEvents.filter(
        event => !shelter.events?.includes(event._id)
      )
      if (!result) {
        res.status(404).end('Not found')
      } else {
        res.status(200).json(result)
      }
    } catch (e) {
      console.log(e)
      res.status(500).end(e?.toString())
    }
  },
  getOne: async (req, res) => {
    try {
      const shelter = await crud.getShelter(req.params?.id)
      const event = shelter.events.find(e => e.id === req.params?.eventId)
      if (!event) {
        return res.status(404).end('Not found')
      }
      const eventResponse = await EventsApi.getEvent(event.remoteID)
      if (eventResponse.ok) {
        const event = await eventResponse.json()
        return res.status(200).json(event)
      } else {
        return res.status(404).end('Not found')
      }
    } catch (e) {
      return res.status(500).end(e?.toString())
    }
  },
  addOne: async (req, res) => {
    try {
      const eventCreateResponse = await EventsApi.addEvent(
        JSON.stringify(req.body)
      )
      if (eventCreateResponse.ok) {
        const event = await eventCreateResponse.json()
        const result = await crud.addShelterEvent(req.params?.id, event?.id)
        if (!result) {
          return res.status(400).end('Bad request')
        }
        return res.status(200).json(event)
      } else {
        return res
          .status(eventCreateResponse.status)
          .end(eventCreateResponse.statusText)
      }
    } catch (e) {
      return res.status(500).end(e?.toString())
    }
  }
}
