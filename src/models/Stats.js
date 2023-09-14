const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('stats', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "Solo se aceptan enteros"
                },
                min: 5,
                max: 255
            }
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "Solo se aceptan enteros"
                },
                min: 5,
                max: 255
            }
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "Solo se aceptan enteros"
                },
                min: 5,
                max: 255
            }
        },
        speed: {
            type: DataTypes.INTEGER,
            defaultValue: 5,
            validate: {
                isInt: {
                    msg: "Solo se aceptan enteros"
                },
                min: 5,
                max: 255
            }
        },
        height: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate: {
                isInt: {
                    msg: "Solo se aceptan enteros"
                },
            }
        },
        weight: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate: {
                isInt: {
                    msg: "Solo se aceptan enteros"
                },
            }
        }
    }, { timestamps: false });
};
