import UserUMKM from "../models/umkmModels.js";
import jsontoken from "jsonwebtoken";

//Create a refresh token function
export const tokenRefresh = async(req, res) => {
    try {
        const tokenRefresh = req.cookies.tokenRefresh;
        if(!tokenRefresh) return res.sendStatus(401);

        //If get the token, compare with token in the database
        const umkm = await UserUMKM.findAll({
            where:{
                refresh_token: tokenRefresh
            } 
        });
        //Token invalid
        if(!umkm[0]) return res.sendStatus(403);
        //Token valid
        jsontoken.verify(tokenRefresh, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const idUmkm = umkm[0].id_umkm;
            const name_umkm = umkm[0].name_umkm;
            const username_umkm = umkm[0].username_umkm;
            const email_umkm = umkm[0].email_umkm;
            const tlp_umkm = umkm[0].tlp_umkm;
            const accessToken = jsontoken.sign({idUmkm, name_umkm, username_umkm, email_umkm, tlp_umkm}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "30s"
            });
            res.json({ accessToken });
        });

    } catch (error) {
        concole.log(error);
    }
}

