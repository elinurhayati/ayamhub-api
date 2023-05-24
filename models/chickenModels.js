import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Chicken = db.define('tb_chicken', {
    id_chicken: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        /*field: 'id' //renamed column */
    },
    id_farm: {
        type: DataTypes.STRING,
    },
    type_chicken: {
        type: DataTypes.STRING,
    },
    price_chicken: {
        type: DataTypes.STRING,
    },
    age_chicken: {
        type: DataTypes.STRING,
    },
    weight_chicken: {
        type: DataTypes.STRING,
    },
    stock_chicken: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
});

export default Chicken;
