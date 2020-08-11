import { Request, Response } from 'express';
import HidraService from '../services/hidra';
class UserController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user = await new Promise((resolve, reject) => {
      const { id } = request.params;
      HidraService.getUserById(
        {
          id,
        },
        (err, user) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          if (user) {
            resolve(user);
          }
        },
      );
    });

    return response.json(user);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const user = await new Promise((resolve, reject) => {
      HidraService.registerUser(
        {
          user: { email, password },
        },
        (err, user) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          if (user) {
            resolve(user);
          }
        },
      );
    });

    return response.json(user);
  }
}

export default UserController;
