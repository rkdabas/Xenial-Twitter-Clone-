import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  // now we have the token. So send the token as the cookie
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milli-seconds
    httpOnly: true, // prevent XSS attacks also called cross-site scripting attacks
    sameSite: "strict", // CSRF attacks also called cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};
