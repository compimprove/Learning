"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("./entity/user");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "testing",
    synchronize: true,
    logging: true,
    entities: [user_1.User],
    subscribers: [],
    migrations: [],
});
//# sourceMappingURL=app-data-source.js.map