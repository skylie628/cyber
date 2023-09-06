import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const private_key = process.env.PRIVATE_KEY!;
const public_key = process.env.PUBLIC_KEY!;

const signJWT = (object: Object, options?: jwt.SignOptions | undefined) => {
  console.log("private_key", private_key);
  return jwt.sign(object, private_key, {
    ...(options && options),
  });
};

const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, public_key);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};

export { signJWT, verifyJWT };
