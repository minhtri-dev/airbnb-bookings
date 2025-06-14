import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String },
    emailAddress: { type: String },
    daytimePhoneNumber: { type: String },
    mobileNumber: { type: String },
    postalAddress: { type: String },
    homeAddress: { type: String },
}, { timestamps: true })

type ClientType = mongoose.InferSchemaType<typeof ClientSchema>

const ClientModel = mongoose.model('clients', ClientSchema)

export { ClientModel, ClientType }