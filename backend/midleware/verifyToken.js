import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

function verifyToken(req, res, next) {
  // 1. Token uthao from cookies
  const token = req.cookies.token;

  // 2. Agar token nahi mila to user authenticated nahi hai
  if (!token) {
    return res.status(401).json({ message: "Token missing. Please login." });
  }

  try {
    // 3. Token verify karo (decode hoke payload milega)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. User info ko request object me daal do for future use
    req.user = decoded;
    // console.log("bhai ye decode vla hai ", req.user);
    // 5. Sab thik to agla middleware ya controller chalao
    next();
  } catch (err) {
    // 6. Agar token galat hai ya expire ho gaya to error bhejo
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

export default verifyToken;
