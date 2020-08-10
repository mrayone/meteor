import { Request, Response } from 'express';

class UserController {
  public async show(request: Request, response: Response): Promise<Response> {
    return response.json({ ok: 'ok' });
  }

  public store(request: Request, response: Response): Promise<Response> {
    return response.json({ ok: 'ok' });
  }
}

export default UserController;
