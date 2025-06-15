export interface IGuest {
  name: string;
  age: number;
}

export interface IBooking {
  // Optional because it might not be provided at creation or could be populated later
  clientId?: string;
  listingId: string;
  startDate: Date;
  endDate: Date;
  depositPaid?: boolean;
  // Balance amount might be represented as a number or string depending on how you process Decimal128
  balanceAmountDue?: number | string;
  balanceDueDate?: Date;
  numGuests?: number;
  guests?: IGuest[];
}