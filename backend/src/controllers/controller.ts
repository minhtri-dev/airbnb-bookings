import { Request, Response } from 'express'

export const contollerFunction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    res.json({
      'message': 'Hello from the controller!',
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error invoking Bedrock')
  }
}