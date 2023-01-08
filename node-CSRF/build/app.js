"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_data_source_1 = require("./app-data-source");
var user_1 = require("./entity/user");
var session = require('express-session');
var cookieParser = require("cookie-parser");
var formidable = require('express-formidable');
// establish database connection
app_data_source_1.AppDataSource
    .initialize()
    .then(function () {
    console.log("Data Source has been initialized!");
})
    .catch(function (err) {
    console.error("Error during Data Source initialization:", err);
});
// create and setup express app
var app = express();
app.set('view engine', 'pug');
app.set('views', 'src/views');
app.use(express.json());
app.use(express.static(__dirname + "/assets"));
app.use(formidable());
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));
app.use(cookieParser());
app.get('/', function (req, res) {
    var session = req.session;
    if (session.userid) {
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }
    else
        res.render('index');
});
app.post("/authenticate", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var fields, results, session_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fields = req.fields;
                    if (!fields.username || !fields.password) {
                        res.send('Invalid username or password');
                    }
                    return [4 /*yield*/, app_data_source_1.AppDataSource.getRepository(user_1.User).find({
                            select: {
                                name: true
                            },
                            where: {
                                name: fields.username,
                                password: fields.password
                            }
                        })];
                case 1:
                    results = _a.sent();
                    if (results) {
                        session_1 = req.session;
                        session_1.userid = fields.username;
                        console.log(session_1);
                        res.send("Hey there, welcome <a href='/logout'>click to logout</a>");
                    }
                    else {
                        res.send('Invalid username or password');
                    }
                    return [2 /*return*/];
            }
        });
    });
});
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});
// register routes
app.get("/users", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_data_source_1.AppDataSource.getRepository(user_1.User).find()];
                case 1:
                    users = _a.sent();
                    res.json(users);
                    return [2 /*return*/];
            }
        });
    });
});
app.get("/users/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_data_source_1.AppDataSource.getRepository(user_1.User).findOneBy({
                        id: Number(req.params.id),
                    })];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
app.post("/users", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_data_source_1.AppDataSource.getRepository(user_1.User).create(req.body)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, app_data_source_1.AppDataSource.getRepository(user_1.User).save(user)];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
app.put("/users/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_data_source_1.AppDataSource.getRepository(user_1.User).findOneBy({
                        id: Number(req.params.id),
                    })];
                case 1:
                    user = _a.sent();
                    app_data_source_1.AppDataSource.getRepository(user_1.User).merge(user, req.body);
                    return [4 /*yield*/, app_data_source_1.AppDataSource.getRepository(user_1.User).save(user)];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
app.delete("/users/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_data_source_1.AppDataSource.getRepository(user_1.User).delete(req.params.id)];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
// start express server
app.listen(3000);
//# sourceMappingURL=app.js.map