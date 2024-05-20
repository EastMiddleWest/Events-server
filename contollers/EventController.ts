import { RequestHandler } from 'express';
import EventModel, {type Event, Participant } from '../models/event';

type QueryParams = {
  page: string;
  sort: 'title' | 'date',
  order: 'asc' | 'desc'
}

export default class EventController {

  static getAllEvents: RequestHandler<any,any, any, Partial<QueryParams>, any> = async (req, res) => {
    const { page = 0, sort = 'date', order = 'asc'  } = req.query
    const limit = 12
    try {
      const events = await EventModel.find().sort({[`${sort}`]: order}).limit(limit).skip(limit*Number(page))
      const totalCount = await EventModel.countDocuments()
      res.setHeader("Access-Control-Expose-Headers", ['X-Total-Count'])
      res.setHeader('X-Total-Count', Math.ceil(totalCount/limit))
      res.status(200).json(events)
    } catch (error) {
      res.status(500).send('Server error')
    }
  }

  static getSingleEvent: RequestHandler<{id: string}, Event | null, any, any, any> = async (req, res) => {
    const { id } = req.params
    try {
      const event = await EventModel.findById(id)
      if(event) {
        res.status(200).json(event)
      }
      else res.status(404).end()
    } catch (error) {
      res.status(500).end()
    }
  }

  static addPrticipantToEvent: RequestHandler<{id: string},any, Participant, any, any> = async (req, res) => {
    const { id } = req.params
    const data = req.body
    try {
      const event = await EventModel.findById(id)
      event?.participants.push(data)
      await event?.save()
      if(event){
        res.status(200).end()
      }
      else res.status(404).end()
    } catch (error) {
      res.status(500).send('Server error')
    }
  }
}