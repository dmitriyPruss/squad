'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      // User.hasMany(models.Order, { foreignKey: 'user_id', targetKey: 'id' }),
      //   User.hasMany(models.Participant, {
      //     foreignKey: 'user_id',
      //     targetKey: 'id'
      //   }),
      //   User.hasMany(models.Offer, { foreignKey: 'user_id', targetKey: 'id' }),
      //   User.hasMany(models.RefreshToken, {
      //     foreignKey: 'user_id',
      //     targetKey: 'id'
      //   });
      User.hasMany(models.Offer, { foreignKey: 'userId', targetKey: 'id' });
      User.hasMany(models.Contest, { foreignKey: 'userId', targetKey: 'id' });
      User.hasMany(models.Rating, { foreignKey: 'userId', targetKey: 'id' });
      User.hasMany(models.Transaction, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'anon.png'
      },
      role: {
        type: DataTypes.ENUM('customer', 'creator'),
        allowNull: false
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0
        }
      },
      accessToken: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false
    }
  );
  return User;
};

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define(
//     'Users',
//     {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: DataTypes.INTEGER
//       },
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       displayName: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//       },
//       avatar: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: 'anon.png'
//       },
//       role: {
//         type: DataTypes.ENUM('customer', 'creator'),
//         allowNull: false
//       },
//       balance: {
//         type: DataTypes.DECIMAL,
//         allowNull: false,
//         defaultValue: 0,
//         validate: {
//           min: 0
//         }
//       },
//       accessToken: {
//         type: DataTypes.TEXT,
//         allowNull: true
//       },
//       rating: {
//         type: DataTypes.FLOAT,
//         allowNull: false,
//         defaultValue: 0
//       }
//     },
//     {
//       timestamps: false
//     }
//   );

//   User.associate = function (models) {
//     User.hasMany(models.Order, { foreignKey: 'user_id', targetKey: 'id' });
//   };

//   User.associate = function (models) {
//     User.hasMany(models.Participant, {
//       foreignKey: 'user_id',
//       targetKey: 'id'
//     });
//   };

//   User.associate = function (models) {
//     User.hasMany(models.Offer, { foreignKey: 'user_id', targetKey: 'id' });
//   };

//   User.associate = function (models) {
//     User.hasMany(models.RefreshToken, {
//       foreignKey: 'user_id',
//       targetKey: 'id'
//     });
//   };

//   return User;
// };
