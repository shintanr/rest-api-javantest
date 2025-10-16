import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "rahasia atuh";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({error: "Tokennya mana??"});

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // ini buat nyimpen data user yg udh di decode, misaln id, nama, email, dll
        next();
    } catch (error) {
        return res.status(401).json({error: "Token ngga valid weh"});
    }
}


// 


