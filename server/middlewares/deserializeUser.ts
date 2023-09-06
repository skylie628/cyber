import { NextFunction, Request, Response } from "express";
import { reIssueAccessToken } from "../services/jwt.service.js";
import { verifyJWT } from "../utils/jwt.utils.js";
import dotenv from "dotenv";
dotenv.config();
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req?.cookies?.accessToken;
  const refreshToken = req?.cookies?.refreshToken;
  if (!accessToken) return next();
  const { decoded, expired } = verifyJWT(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);
    if (newAccessToken) {
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: process.env.DOMAIN,
      });
      const { decoded } = verifyJWT(newAccessToken);
      res.locals.user = decoded;
      return next();
    }
  }

  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    //maxAge: 1000000,
    //signed: true
    domain: process.env.DOMAIN,
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    //maxAge: 1000000,
    //signed: true
    domain: process.env.DOMAIN,
  });
  return res.status(404).send("Invalid access token or refresh token");
};

export default deserializeUser;
