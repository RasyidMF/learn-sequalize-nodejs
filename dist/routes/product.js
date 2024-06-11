"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ProductRouter_instances, _ProductRouter_setupRouters;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = __importDefault(require("../controllers/product"));
class ProductRouter {
    constructor() {
        _ProductRouter_instances.add(this);
        this.router = (0, express_1.Router)();
        // Initilaize the routers
        __classPrivateFieldGet(this, _ProductRouter_instances, "m", _ProductRouter_setupRouters).call(this);
    }
}
_ProductRouter_instances = new WeakSet(), _ProductRouter_setupRouters = function _ProductRouter_setupRouters() {
    this.router.get("/product/get", product_1.default.index);
    this.router.post("/product/add", product_1.default.store);
    this.router.put("/product/update/:id", product_1.default.update);
    this.router.delete("/product/delete/:id", product_1.default.delete);
};
exports.default = ProductRouter;
