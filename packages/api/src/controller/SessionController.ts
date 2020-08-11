import { Request, Response } from 'express';
import HidraService from '../services/hidra';

class SessionController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const token = await new Promise((resolve, reject) => {
      HidraService.loginUser(
        {
          user: { email, password },
        },
        (err, token) => {
          if (err) {
            console.error(err);
            reject(err);
            throw Error(err);
          }
          if (token) {
            resolve(token);
          }
        },
      );
    });

    return response.json(token);
  }
}

export default SessionController;
