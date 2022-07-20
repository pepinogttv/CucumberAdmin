import { decodeToken } from "../../../adminUser/infrastructure/jwt.services.js";

export async function authenticate(req, res, next) {
  let { token } = req.cookies;
  if (!token)
    token = req.headers.authorization
      ? req.headers.authorization?.split(" ")[1]
      : null;
  if (!token)
    return res.status(403).json({ error: { description: "Unauthorized" } });
  try {
    req.user = await decodeToken(token);
    next();
  } catch (err) {
    res.status(403).json({ message: "Unauthorized" });
  }
}
