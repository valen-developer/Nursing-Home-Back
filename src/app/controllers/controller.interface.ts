import { Request, Response } from 'express';

export abstract class Controller {
  public abstract run(req: Request, res: Response): Promise<void> | void;
}
