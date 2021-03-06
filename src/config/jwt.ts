import * as jwt from "jsonwebtoken";

export class Jwt {
  /*
  * getAuthToken
  */
  public static getAuthToken(data: any) {
    return jwt.sign(data, process.env.JWT_SECRET_KEY as string);
  }

  /*
  * decodeAuthToken
  */
  public static decodeAuthToken(token: string) {
    if (token) {
      try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      } catch (error) {
        // logger.error(error);
        return false;
      }
    }
    return false;
  }
}
