import { NextFunction, Request, Response } from 'express';
import { HTTPException } from '../../context/shared/domain/httpException';
import { JWT } from '../../context/shared/infrastructure/jsonwebtoken.jwt';
import { errorHandler } from '../../helpers/errorHandler';
import { enviroment } from '../config/enviroment';
import { getContainer } from '../dic/getContainer';
import { UtilDependencies } from '../dic/utils.inhector';
import { Middleware } from './middleware.interface';

const service = 'verify token middleware';

export class VerifyTokenMiddleware implements Middleware {
  public run(req: Request, res: Response, next: NextFunction) {
    const { token } = req.headers;

    try {
      const container = getContainer();
      const jwt: JWT = container.get(UtilDependencies.JWT);

      const isValidToken = jwt.verify(
        token?.toString() ?? '',
        enviroment.token.seed
      );

      if (!isValidToken) throw new HTTPException(service, 'invalid token', 401);

      const payload: { uuid: string } = jwt.decode(token as string, {
        json: true,
      }) as { uuid: string };

      req.body.uuid = payload.uuid;

      next();
    } catch (error) {
      errorHandler(res, error, service);
    }
  }
}
