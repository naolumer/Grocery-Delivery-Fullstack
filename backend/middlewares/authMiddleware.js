import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized - No token provided"
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decodedToken._id;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not Authorized - " + error.message
        });
    }
};
