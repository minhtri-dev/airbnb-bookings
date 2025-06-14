import mongoose from 'mongoose'

const GuestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
}, { _id: false })

const BookingSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'clients', required: true },
    listingId: { type: String, ref: 'listings', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    depositPaid: { type: Boolean},
    balanceAmountDue: { type: mongoose.Schema.Types.Decimal128 },
    balanceDueDate: { type: Date },
    numGuests: { type: Number },
    guests: { type: [GuestSchema] },
}, { timestamps: true })

type BookingType = mongoose.InferSchemaType<typeof BookingSchema>

const BookingModel = mongoose.model('bookings', BookingSchema)

export { BookingModel, BookingType }