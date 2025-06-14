import { Router } from 'express'
import { addClient } from '@/controllers/clients.controller'

const router = Router()

router.post('/client', addClient)

export default router