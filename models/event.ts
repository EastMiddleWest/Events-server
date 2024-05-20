import mongoose from "mongoose"

export type Event = {
  title: string;
  description: string;
  date: Date;
  organizer: string;
  participants: Participant[]
}

export type Participant = {
  fullName: string;
  email: string;
  dateOfBirth: string;
  registartionDate: Date;
  source: string;
}

const eventSchema = new mongoose.Schema<Event>({
  title: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: Date, required: true},
  organizer: {type: String, required: true},
  participants: [
    {
      fullName: {type: String, required: true},
      email: {type: String, required: true},
      dateOfBirth: {type: String, required: true},
      source: {type: String, required: true},
      registartionDate: {type: Date, default: Date.now}
    }
  ]
})

export const EventModel = mongoose.model('Event', eventSchema, 'Events')

export default EventModel