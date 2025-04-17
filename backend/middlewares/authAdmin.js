import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
    try {
        const atoken = req.headers['authorization']?.split(" ")[1];

        if (!atoken) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized - No token provided"
            });
        }

        const decodedToken = jwt.verify(atoken, process.env.JWT_SECRET);
        next();
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not Authorized - " + error.message
        });
    }
};
