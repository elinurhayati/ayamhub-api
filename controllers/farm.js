import UserFarm from "../models/farmModels.js";
import bcrypt from "bcrypt";
import jsontoken from "jsonwebtoken";

export const getFarm = async(req, res) => {
    try {
        const farm = await UserFarm.findAll({
            attributes: ['id_farm', 'name_farm', 'username_farm', 'email_farm', 'tlp_farm', 'address_farm' ]
        });
        res.json(farm);
    } catch (error) {
        console.log(error);
    }
}

export const RegistFarm = async(req, res) => {
    const{name_farm, username_farm, pass_farm, email_farm, tlp_farm} = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(pass_farm, salt);
    try {
        await UserFarm.create({
            name_farm: name_farm,
            username_farm: username_farm,
            pass_farm: hashedPass,
            email_farm: email_farm,
            tlp_farm: tlp_farm
        });
        res.json({message: "Register Successfully"});
    } catch (error) {
        console.log(error);
    }
}

export const LoginFarm = async(req, res) => {
    try {
        const farm = await UserFarm.findAll({
            where:{
                email_farm: req.body.email_farm
            }
        });
        const TruePassword = await bcrypt.compare(req.body.pass_farm, farm[0].pass_farm);
        if(!TruePassword) return res.status(400).json({
            message: "Invalid Password"
        });
        const idFarm = farm[0].id_farm;
        const name_farm = farm[0].name_farm;
        const username_farm = farm[0].username_farm;
        const email_farm = farm[0].email_farm;
        const tlp_farm = farm[0].tlp_farm;
        const address_farm = farm[0].address_farm;
        const pic_farm = farm[0].pic_farm;

        const accessToken = jsontoken.sign({idFarm, name_farm, username_farm, email_farm, tlp_farm, address_farm, pic_farm}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "60s"
        });
        const tokenRefreshFarm = jsontoken.sign({idFarm, name_farm, username_farm, email_farm, tlp_farm, address_farm, pic_farm}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "12h"
        });
        //save refresh token in database
        await UserFarm.update({refresh_token: tokenRefreshFarm}, {
            where:{
                id_farm: idFarm
            }
        });
        //sent http cookie to client
        res.cookie('tokenRefreshFarm', tokenRefreshFarm, {
            httpOnly: true,
            maxAge : 24 * 60 * 60 * 1000
        });
        //sent access token to client
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({message: "Email not found"});
    }
}

export const LogoutFarm = async(req, res) => {
    const tokenRefreshFarm = req.cookies.tokenRefreshFarm;
    if(!tokenRefreshFarm) return res.sendStatus(204);

    //If get the token, compare with token in the database
    const farm = await UserFarm.findAll({
        where:{
            refresh_token: tokenRefreshFarm
        } 
    });
    //Token invalid
    if(!farm[0]) return res.sendStatus(204);
    //Get id_farm from database & clear the refresh_token
    const idFarm = farm[0].id_farm;
    await UserFarm.update({refresh_token: null}, {
        where: {
            id_farm: idFarm
        }
    });
    res.clearCookie('tokenRefreshFarm');
    return res.sendStatus(200);
}

export const UpdateFarm = async(req, res) => {
    const { id_farm } = req.params;
    const{name_farm, username_farm, pass_farm, email_farm, tlp_farm, address_farm, pic_farm} = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(pass_farm, salt);
    try {
        await UserFarm.update({
            name_farm: name_farm,
            username_farm: username_farm,
            pass_farm: hashedPass,
            email_farm: email_farm,
            tlp_farm: tlp_farm,
            address_farm: address_farm,
            pic_farm: pic_farm
        }, {
            where: {
                id_farm: id_farm
            }
        });
        res.json({message: "Update Successfully"});
    } catch (error) {
        console.log(error);
    }
}



