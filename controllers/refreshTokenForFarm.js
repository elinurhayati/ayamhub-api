import UserFarm from "../models/farmModels.js";
import jsontoken from "jsonwebtoken";

//Create a refresh token function
export const tokenRefreshFarm = async(req, res) => {
    try {
        const tokenRefreshFarm = req.cookies.tokenRefreshFarm;
        if(!tokenRefreshFarm) return res.sendStatus(401);

        //If get the token, compare with token in the database
        const farm = await UserFarm.findAll({
            where:{
                refresh_token: tokenRefreshFarm
            } 
        });
        //Token invalid
        if(!farm[0]) return res.sendStatus(403);
        //Token valid
        jsontoken.verify(tokenRefreshFarm, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const idFarm = farm[0].id_farm;
            const name_farm = farm[0].name_farm;
            const username_farm = farm[0].username_farm;
            const email_farm = farm[0].email_farm;
            const tlp_farm = farm[0].tlp_farm;
            const address_farm = farm[0].address_farm;
            const pic_farm = farm[0].pic_farm;
            const accessToken = jsontoken.sign({idFarm, name_farm, username_farm, email_farm, tlp_farm, address_farm, pic_farm}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "30s"
            });
            res.json({ accessToken });
        });

    } catch (error) {
        concole.log(error);
    }
}

