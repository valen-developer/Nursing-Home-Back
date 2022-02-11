import jwt from "jsonwebtoken";
import { IJWT } from "../domain/interfaces/jwt.interfaces";

export class JWT implements IJWT {
  decode(
    token: string,
    options: jwt.DecodeOptions
  ):
    | string
    | {
        [key: string]: any;
      }
    | null {
    return jwt.decode(token, options);
  }

  sign(
    payload: string | object | Buffer,
    secret: string,
    options?: jwt.SignOptions
  ): string {
    return jwt.sign(payload, secret, { ...options });
  }

  verify(token: string, secret: string, options?: object): boolean {
    if (!token) return false;

    try {
      const jwtResponse = jwt.verify(token, secret, options);
      if (!jwtResponse) return false;

      return true;
    } catch (error) {
      return false;
    }
  }
}
