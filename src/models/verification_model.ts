
import { Schema, model, ObjectId } from "mongoose";

interface VerificationInterface {
    user_id: ObjectId
    type: string
    key: string
}

const schema = new Schema<VerificationInterface>({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    key: { type: String, required: true }
})

const VerificationModel = model<VerificationInterface>('Verification', schema)

export default VerificationModel