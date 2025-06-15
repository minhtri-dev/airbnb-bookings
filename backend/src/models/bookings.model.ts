import mongoose from 'mongoose'

const GuestSchema = new mongoose.Schema(
  {
    name: { type: String },
    age: { type: Number },
  },
  { _id: false },
)

const BookingSchema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'clients' },
    listingId: { type: String, ref: 'listings', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    depositPaid: { type: Boolean },
    balanceAmountDue: { type: mongoose.Schema.Types.Decimal128 },
    balanceDueDate: { type: Date },
    numGuests: { type: Number },
    guests: { type: [GuestSchema] },
  },
  { versionKey: false },
)

type BookingType = mongoose.InferSchemaType<typeof BookingSchema>

const BookingModel = mongoose.model('bookings', BookingSchema)

export { BookingModel, BookingType }
