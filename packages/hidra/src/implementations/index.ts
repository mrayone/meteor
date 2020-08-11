import User from '../models/User';
import grpc from 'grpc';
export default {
  async getUserById(
    call: any,
    callback: CallableFunction,
  ): Promise<CallableFunction> {
    const { id } = call.request;
    const user = await User.findById(id);

    if (!user)
      return callback({
        code: grpc.status.NOT_FOUND,
        details: `User not found`,
      });

    user.id = user._id;

    return callback(null, {
      user: { ...user.toObject(), password: undefined },
    });
  },

  async registerUser(
    call: any,
    callback: CallableFunction,
  ): Promise<CallableFunction> {
    const { email, username, password } = call.request.user;

    const user = await User.create({
      email,
      username,
      password,
    });

    user.id = user._id;

    return callback(null, { user });
    // registrar no banco e retornar usuário com id.
  },

  async loginUser(call, callback): Promise<CallableFunction> {
    const { email, password } = call.request.user;
    const user = await User.findOne({ email });
    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: 'User not found!',
      });
    }

    if (!(await user.compareHash(password))) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: `Username and password does match`,
      });
    }

    return callback(null, {
      token: User.generateToken(user),
    });
  },
};
