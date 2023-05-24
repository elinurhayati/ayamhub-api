import UserUMKM from "../models/umkmModels.js";
import bcrypt from "bcrypt";
import jsontoken from "jsonwebtoken";

export const getUMKM = async(req, res) => {
    try {
        const umkm = await UserUMKM.findAll({
            attributes: ['id_umkm', 'name_umkm', 'username_umkm', 'email_umkm', 'tlp_umkm' ]
        });
        res.json(umkm);
    } catch (error) {
        console.log(error);
    }
}

export const RegistUmkm = async(req, res) => {
    const{name_umkm, username_umkm, pass_umkm, email_umkm, tlp_umkm} = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(pass_umkm, salt);
    try {
        await UserUMKM.create({
            name_umkm: name_umkm,
            username_umkm: username_umkm,
            pass_umkm: hashedPass,
            email_umkm: email_umkm,
            tlp_umkm: tlp_umkm
        });
        res.json({message: "Register Successfully"});
    } catch (error) {
        console.log(error);
    }
}

export const LoginUmkm = async(req, res) => {
    try {
        const umkm = await UserUMKM.findAll({
            where:{
                email_umkm: req.body.email_umkm
            }
        });
        const TruePassword = await bcrypt.compare(req.body.pass_umkm, umkm[0].pass_umkm);
        if(!TruePassword) return res.status(400).json({
            message: "Invalid Password"
        });
        const idUmkm = umkm[0].id_umkm;
        const name_umkm = umkm[0].name_umkm;
        const username_umkm = umkm[0].username_umkm;
        const email_umkm = umkm[0].email_umkm;
        const tlp_umkm = umkm[0].tlp_umkm;
        const accessToken = jsontoken.sign({idUmkm, name_umkm, username_umkm, email_umkm, tlp_umkm}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "60s"
        });
        const tokenRefresh = jsontoken.sign({idUmkm, name_umkm, username_umkm, email_umkm, tlp_umkm}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "12h"
        });
        //save refresh token in database
        await UserUMKM.update({refresh_token: tokenRefresh}, {
            where:{
                id_umkm: idUmkm
            }
        });
        //sent http cookie to client
        res.cookie('tokenRefresh', tokenRefresh, {
            httpOnly: true,
            maxAge : 24 * 60 * 60 * 1000
        });
        //sent access token to client
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({message: "Email not found"});
    }
}

export const LogoutUmkm = async(req, res) => {
    const tokenRefresh = req.cookies.tokenRefresh;
    if(!tokenRefresh) return res.sendStatus(204);

    //If get the token, compare with token in the database
    const umkm = await UserUMKM.findAll({
        where:{
            refresh_token: tokenRefresh
        } 
    });
    //Token invalid
    if(!umkm[0]) return res.sendStatus(204);
    //Get id_umkm from database & clear the refresh_token
    const idUmkm = umkm[0].id_umkm;
    await UserUMKM.update({refresh_token: null}, {
        where: {
            id_umkm: idUmkm
        }
    });
    res.clearCookie('tokenRefresh');
    return res.sendStatus(200);
}

export const UpdateUMKM = async(req, res) => {
    const { id_umkm } = req.params;
    const{name_umkm, username_umkm, pass_umkm, email_umkm, tlp_umkm, address_umkm, pic_umkm} = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(pass_umkm, salt);
    try {
        await UserUMKM.update({
            name_umkm: name_umkm,
            username_umkm: username_umkm,
            pass_umkm: hashedPass,
            email_umkm: email_umkm,
            tlp_umkm: tlp_umkm,
            address_umkm: address_umkm,
            pic_umkm: pic_umkm
        }, {
            where: {
                id_umkm: id_umkm
            }
        });
        res.json({message: "Update Successfully"});
    } catch (error) {
        console.log(error);
    }
}



