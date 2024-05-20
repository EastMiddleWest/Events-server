import {Router} from 'express'
import EventController from '../contollers/EventController';
import { cron } from '../contollers/cron';

const router = Router()

router.get('/test', async (req, res) => {
  res.status(200).send('I am working!')
})

router.get('/events', EventController.getAllEvents)

router.get('/events/:id', EventController.getSingleEvent)

router.put('/events/:id', EventController.addPrticipantToEvent)

router.use('/cron', cron)

export default router