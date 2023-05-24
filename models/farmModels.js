import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const UserFarm = db.define('tb_farm', {
    id_farm: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        /*field: 'id' //renamed column */
    },
    name_farm: {
        type: DataTypes.STRING,
    },
    username_farm: {
        type: DataTypes.STRING,
    },
    pass_farm: {
        type: DataTypes.STRING,
    },
    email_farm: {
        type: DataTypes.STRING,
    },
    tlp_farm: {
        type: DataTypes.STRING,
    },
    address_farm: {
        type: DataTypes.STRING,
    },
    pic_farm: {
        type: DataTypes.STRING,
    },
    refresh_token:{
        type: DataTypes.TEXT,
    }
}, {
    freezeTableName: true
});

export default UserFarm;
