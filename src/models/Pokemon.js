const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING, // 255
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z\-]+$/i
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true
      }
    },  
    imageShiny: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      }
    }

  }, { timestamps: false });
};
