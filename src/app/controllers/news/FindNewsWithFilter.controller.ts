import { Request, Response } from "express";
import { errorHandler } from "../../../helpers/errorHandler";
import { Controller } from "../controller.interface";

export class FindNewsWithFilter implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    try {
    } catch (error) {
      errorHandler(res, error, "find news with filter controller");
    }
  }
}
