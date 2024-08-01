import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    _id: string,
    name: string;
    password: string;
    email: string;
    role: string;
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        role: { type: String, required: true, default: 'user' },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
