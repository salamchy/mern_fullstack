import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.authToken;
  try {
    if (!token) {
      return res.status(401).send({ message: "token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send({
        message: "Invalid token",
      });
    }
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.log("failed to decode token,", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
