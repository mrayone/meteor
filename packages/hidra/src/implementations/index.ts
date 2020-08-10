import User from '../models/User';

export default {
  async getUserById(
    call: any,
    callback: CallableFunction,
  ): Promise<CallableFunction> {
    const { id } = call.request;

    const user = await User.findById(id);
    // consultar banco de dados;

    return callback(null, { user });
  },

  async registerUser(
    call: any,
    callback: CallableFunction,
  ): Promise<CallableFunction> {
    const { email, username, password } = call.request;

    const user = await User.create({
      email,
      username,
      password,
    });

    return callback(null, { user });
    // registrar no banco e retornar usuário com id.
  },

  async loginUser(
    call: any,
    callback: CallableFunction,
  ): Promise<CallableFunction> {
    const { email, password } = call.request;
    // consultar no banco verificar credenciais e retornar token ou erro.

    const user = await User.findOne({ email });
    if (!user) {
      return callback({ error: 'User not found!' });
    }

    if (!(await user.compareHash(password))) {
      return callback({ error: `Username and password does match` });
    }

    return callback(null, {
      token: User.generateToken(user),
    });
  },
};
