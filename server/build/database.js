"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const key_1 = __importDefault(require("./key"));
const pool = mysql_1.default.createPool(key_1.default.database);
if (pool) {
    console.log('Database is Connected');
}
else {
    console.log('Database is not connected');
}
exports.default = pool;
