import { Request, Response } from "express";
import { Jwt } from "../../config/jwt";
const bcrypt = require("bcryptjs");
import { UserInterface } from "src/Interfaces/userInterface";
import { AuthUtils } from "./authUtils";
import { StatusCodes } from "http-status-codes";

export class AuthController {
  public authUtils: AuthUtils = new AuthUtils();
  public userSignup = async (req: Request, res: Response) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      const encryptedPassword: string = bcrypt.hashSync(password, 10);
      const userData: UserInterface = {
        first_name,
        last_name,
        email,
        password: encryptedPassword,
      };
      const result = await this.authUtils.createUser(userData);
      return res.status(200).json({ message: "User Created", data: result });
    } catch (error) {
      return res.status(503).json({ error: "Something went wrong." });
    }
  };

  public userLogin = async (req: Request, res: Response) => {
    try {
      const userInfo: any = res.locals._userInfo;
      const userData = {
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        token: Jwt.getAuthToken({ id: userInfo.id })
      };
      return res.status(StatusCodes.OK).json({
        message: "Login Successfull.",
        data: userData,
      });
    } catch (error) {
      console.error("error",error)
      return res.status(503).json({ error: "Something went wrong." });
    }
  };
}
