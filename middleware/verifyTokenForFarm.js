import jsontoken from "jsonwebtoken";

//Create a function to verify the token
export const verifyTokenForFarm = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const tokenFarm = authHeader && authHeader.split(' ')[1];

    //Validate the token
    if(!tokenFarm == null) return res.sendStatus(401);
    jsontoken.verify(tokenFarm, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.email_farm = decoded.email_farm;
        next();
    });
}