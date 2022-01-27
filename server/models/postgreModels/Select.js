'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Select extends Model {
    static associate (models) {}
  }
  Select.init(
    {
      type: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      describe: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Select',
      timestamps: false
    }
  );
  return Select;
};

// module.exports = (sequelize, DataTypes) => {
//   const SelectBox = sequelize.define(
//     'Selects',
//     {
//       type: {
//         allowNull: false,
//         primaryKey: true,
//         type: DataTypes.STRING
//       },
//       describe: {
//         allowNull: false,
//         primaryKey: true,
//         type: DataTypes.STRING
//       }
//     },
//     {
//       timestamps: false
//     }
//   );

//   return SelectBox;
// };
