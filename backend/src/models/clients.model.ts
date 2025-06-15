import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema({
    name: { type: String },
    emailAddress: { type: String },
    daytimePhoneNumber: { type: String },
    mobileNumber: { type: String },
    postalAddress: { type: String },
    homeAddress: { type: String },
},
 { versionKey: false }
)

type ClientType = mongoose.InferSchemaType<typeof ClientSchema>

const ClientModel = mongoose.model('clients', ClientSchema)

export { ClientModel, ClientType }