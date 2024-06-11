"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Server_instances, _a, _Server_expressApp, _Server_setupRouters, _Server_setupDatabase;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const PORT = process.env.SERVER_PORT || 3000;
class Server {
    constructor(routers = []) {
        _Server_instances.add(this);
        _Server_expressApp.set(this, void 0);
        __classPrivateFieldSet(this, _Server_expressApp, (0, express_1.default)(), "f");
        // Configuring routers
        __classPrivateFieldGet(this, _Server_instances, "m", _Server_setupRouters).call(this, routers);
        // Configuring database
        __classPrivateFieldGet(this, _Server_instances, "m", _Server_setupDatabase).call(this);
    }
    // Start the http service
    start() {
        __classPrivateFieldGet(this, _Server_expressApp, "f").listen(PORT, () => {
            console.log(`Listening to port ${PORT}`);
        });
    }
}
_a = Server, _Server_expressApp = new WeakMap(), _Server_instances = new WeakSet(), _Server_setupRouters = function _Server_setupRouters(routers = []) {
    routers.forEach((expressRouter) => {
        __classPrivateFieldGet(this, _Server_expressApp, "f").use(expressRouter.router);
    });
}, _Server_setupDatabase = function _Server_setupDatabase() {
    _a.db = new sequelize_1.Sequelize(process.env.DB_NAME || "test_db", process.env.DB_USERNAME || "test", process.env.DB_PASSWORD || "", {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
    });
    _a.db
        .authenticate()
        .then(() => {
        console.log(`Database ${process.env.DB_NAME} connected!`);
        // Sync the models
        require("./models");
        _a.db
            .sync()
            .then(() => {
            console.log("Synchronize successfully!");
        })
            .catch((error) => {
            console.error("Unable to synchronize models : ", error);
        });
    })
        .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    });
};
exports.default = Server;
