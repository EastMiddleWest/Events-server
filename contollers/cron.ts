import { RequestHandler } from 'express';
import axios from 'axios';
import EventModel, { type Event } from '../models/event';

type Data = {
  summary: string;
  description: string;
  dtstart: string;
}

export const cron: RequestHandler = async (req, res) => {

  const options = {
    method: 'GET',
    url: 'https://calendars.p.rapidapi.com/ical_fetch',
    params: {
      c: 'barclays',
      json: 'true'
    },
    headers: {
      'X-RapidAPI-Key': 'd4e0849e0bmshd66acda5ae09d4dp14758bjsndfdb421f9d63',
      'X-RapidAPI-Host': 'calendars.p.rapidapi.com'
    }
  }

  try {
    const response = await axios.request(options);
    const data = response.data.events as Data[]
    const mappedData: Event[] = data.map(el => {
      return {
        title: el.summary,
        description: el.description,
        date: new Date(el.dtstart),
        organizer: 'Brooklyn Steel',
        participants: []
      }
    })
    await EventModel.insertMany(mappedData)
    res.status(200).end()
  } catch (error) {
    console.error(error);
    res.status(500).end()
  }
}