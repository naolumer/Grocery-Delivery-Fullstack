import jwt from 'jsonwebtoken';

export const adminAuth = async (req, res, next) => {
  try {
    const atoken = req.headers['authorization']?.split(" ")[1];

    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized - No token provided"
      });
    }

    const decodedToken = jwt.verify(atoken, process.env.JWT_SECRET);
    req.user = decodedToken;

    if (decodedToken.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: "Not Authorized - Admins only"
      });
    }
    next();

  } catch (error) {
    return res.json({
      success: false,
      message: "Not Authorized - " + error.message
    });
  }
};