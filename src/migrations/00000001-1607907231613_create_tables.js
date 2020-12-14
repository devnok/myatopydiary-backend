'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Moisturizers", deps: []
 * createTable "Pills", deps: []
 * createTable "Creams", deps: []
 * createTable "Accounts", deps: []
 * createTable "Users", deps: [Accounts]
 * createTable "AtopyDetails", deps: [Users]
 * createTable "Reports", deps: [Users]
 * createTable "ReportDetails", deps: [Reports]
 *
 **/

var info = {
    "revision": 1,
    "name": "1607907231613-create-tables",
    "created": "2020-12-14T00:53:51.771Z",
    "comment": ""
};

var migrationCommands = [

    {
        fn: "createTable",
        params: [
            "Moisturizers",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "title": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Pills",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "title": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Creams",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "title": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Accounts",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "nickname": {
                    "type": Sequelize.STRING
                },
                "email": {
                    "validate": {
                        "isEmail": true
                    },
                    "unique": true,
                    "type": Sequelize.STRING
                },
                "password": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "birthday": {
                    "validate": {
                        "isDate": true
                    },
                    "type": Sequelize.DATEONLY
                },
                "gender": {
                    "validate": {
                        "isIn": [
                            ["male", "female"]
                        ]
                    },
                    "type": Sequelize.STRING
                },
                "accountId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Accounts",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "AtopyDetails",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "startYear": {
                    "validate": {
                        "min": 1900
                    },
                    "type": Sequelize.INTEGER
                },
                "comorbidity": {
                    "type": Sequelize.STRING
                },
                "visitingHospital": {
                    "type": Sequelize.STRING
                },
                "userId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Reports",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "reportAt": {
                    "validate": {
                        "isDate": true
                    },
                    "type": Sequelize.DATE
                },
                "etScore": {
                    "type": Sequelize.INTEGER
                },
                "opScore": {
                    "type": Sequelize.INTEGER
                },
                "ecScore": {
                    "type": Sequelize.INTEGER
                },
                "lfScore": {
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "ReportDetails",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "itchScore": {
                    "validate": {
                        "min": 0
                    },
                    "type": Sequelize.INTEGER
                },
                "exacerbation": {
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "content": {
                    "type": Sequelize.STRING
                },
                "reportId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Reports",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    }
];

var rollbackCommands = [{
        fn: "dropTable",
        params: ["Users"]
    },
    {
        fn: "dropTable",
        params: ["AtopyDetails"]
    },
    {
        fn: "dropTable",
        params: ["Reports"]
    },
    {
        fn: "dropTable",
        params: ["ReportDetails"]
    },
    {
        fn: "dropTable",
        params: ["Moisturizers"]
    },
    {
        fn: "dropTable",
        params: ["Pills"]
    },
    {
        fn: "dropTable",
        params: ["Creams"]
    },
    {
        fn: "dropTable",
        params: ["Accounts"]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    down: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < rollbackCommands.length)
                {
                    let command = rollbackCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
