export interface IGuest {
  name: string
  age: number
}

export interface IBooking {
  clientId?: string
  listingId: string
  startDate: Date
  endDate: Date
  depositPaid?: boolean
  balanceAmountDue?: number | string
  balanceDueDate?: Date
  numGuests?: number
  guests?: IGuest[]
}
