import { Request, Response } from 'express'

import { ClientModel } from '@/models/clients.model'

export const addClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      emailAddress,
      daytimePhoneNumber,
      mobileNumber,
      postalAddress,
      homeAddress,
    } = req.body

    ClientModel.insertOne({
      name,
      emailAddress,
      daytimePhoneNumber,
      mobileNumber,
      postalAddress,
      homeAddress,
    })
    res.json()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch listings' })
  }
}
