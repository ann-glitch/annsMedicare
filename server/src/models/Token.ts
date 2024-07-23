import mongoose, { Document, Schema } from 'mongoose';

interface IToken extends Document {
  token: string;
  expiresAt: Date;
}

const TokenSchema: Schema = new Schema({
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const Token = mongoose.model<IToken>('Token', TokenSchema);

export default Token;
