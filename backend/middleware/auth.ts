import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function auth(req: any, res: any, next: any) {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({
        error: "Token mancante",
      });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({
      error: "Token non valido",
    });
  }
}

export default auth;
