import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const UserUMKM = db.define('tb_umkm', {
    id_umkm: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        /*field: 'id' //renamed column */
    },
    name_umkm: {
        type: DataTypes.STRING,
    },
    username_umkm: {
        type: DataTypes.STRING,
    },
    pass_umkm: {
        type: DataTypes.STRING,
    },
    email_umkm: {
        type: DataTypes.STRING,
    },
    tlp_umkm: {
        type: DataTypes.STRING,
    },
    refresh_token:{
        type: DataTypes.TEXT,
    }
}, {
    freezeTableName: true
});

export default UserUMKM;
