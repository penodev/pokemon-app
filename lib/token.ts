import jwt from "jsonwebtoken";

interface GenerateTokenProps {
  id: string;
  email: string;
}

interface JwtPayloadType {
  exp: number;
  iat: number;
  id: string;
  email: string;
}

const secret = process.env.AUTH_SECRET;

export const generateToken = async ({ id, email }: GenerateTokenProps) => {
  if (secret) {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 20,
        id,
        email,
      },
      secret
    );
    return token;
  }
  return { error: "Secret not found" };
};

export const verifyToken = async (token?: string) => {
  if (secret) {
    try {
      if (token) {
        const decoded = <JwtPayloadType>jwt.verify(token, secret);
        if (decoded) {
          return { success: decoded };
        }
      }
      return { error: "Invalid token!" };
    } catch (err) {
      // console.log(err);
      return { error: "Invalid token!" };
    }
  }
  return { error: "Secret not found" };
};

export const apiVerifyToken = async (auth: string | null) => {
  const validToken = await verifyToken(auth?.split(" ")[1]);
  if (validToken.success) {
    return validToken.success.id;
  }
  return false;
};
