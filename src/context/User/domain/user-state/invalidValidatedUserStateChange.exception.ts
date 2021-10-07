import { HTTPException } from '../../../shared/domain/httpException';

export class InvalidValidatedUserStateChange extends HTTPException {
  constructor(message: string) {
    super('Invalid validated user state change', message, 400);
  }
}
