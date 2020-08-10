import { Request, Response } from 'express';
import { promisify } from 'util';
import HidraService from '../services/hidra';

class SessionController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    console.log(email, password);
    const response = await promisify(HidraService.loginUser)({
      email,
      password,
    });
    return response.json(response);
  }
}

export default SessionController;
