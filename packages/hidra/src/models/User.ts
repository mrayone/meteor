import mongoose from 'mongoose';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  id: String,
  email: String,
  username: String,
  password: String,
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 8);

  return this;
});

UserSchema.methods = {
  async compareHash(payload: string): Promise<boolean> {
    return compare(payload, this.password);
  },
};

UserSchema.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, 'banana', {
      expiresIn: 84700,
    });
  },
};

export default mongoose.model('User', UserSchema);
