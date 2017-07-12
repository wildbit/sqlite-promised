"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3 = require("sqlite3");
function openDatabaseAsync(filePath) {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(filePath, error => {
            if (error) {
                reject(error);
            }
            else {
                resolve(db);
            }
        });
    });
}
exports.openDatabaseAsync = openDatabaseAsync;
function closeDatabaseAsync(db) {
    return new Promise((resolve, reject) => {
        db.close(error => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
}
exports.closeDatabaseAsync = closeDatabaseAsync;
function prepareStatementAsync(db, sql) {
    return new Promise((resolve, reject) => {
        let stmt = db.prepare(sql, error => {
            if (error) {
                reject(error);
            }
            else {
                resolve(stmt);
            }
        });
    });
}
exports.prepareStatementAsync = prepareStatementAsync;
function finalizeStatementAsync(stmt) {
    return new Promise((resolve, reject) => {
        stmt.finalize(error => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
}
exports.finalizeStatementAsync = finalizeStatementAsync;
function runStatementAsync(stmt, params) {
    return new Promise((resolve, reject) => {
        stmt.run(params, error => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
}
exports.runStatementAsync = runStatementAsync;
function queryStatementAsync(stmt, params) {
    return new Promise((resolve, reject) => {
        stmt.all(params, (error, rows) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(rows);
            }
        });
    });
}
exports.queryStatementAsync = queryStatementAsync;
function runAndFinalizeAsync(db, sql, params) {
    return __awaiter(this, void 0, void 0, function* () {
        let stmt = yield prepareStatementAsync(db, sql);
        yield runStatementAsync(stmt, params);
        yield finalizeStatementAsync(stmt);
    });
}
exports.runAndFinalizeAsync = runAndFinalizeAsync;
function runAndCloseAsync(db, sql, params) {
    return __awaiter(this, void 0, void 0, function* () {
        yield runAndFinalizeAsync(db, sql, params);
        yield closeDatabaseAsync(db);
    });
}
exports.runAndCloseAsync = runAndCloseAsync;
function queryAndFinalizeAsync(db, sql, params) {
    return __awaiter(this, void 0, void 0, function* () {
        let stmt = yield prepareStatementAsync(db, sql);
        let rows = yield queryStatementAsync(stmt, params);
        yield finalizeStatementAsync(stmt);
        return rows;
    });
}
exports.queryAndFinalizeAsync = queryAndFinalizeAsync;
function queryAndCloseAsync(db, sql, params) {
    return __awaiter(this, void 0, void 0, function* () {
        let rows = yield queryAndFinalizeAsync(db, sql, params);
        yield closeDatabaseAsync(db);
        return rows;
    });
}
exports.queryAndCloseAsync = queryAndCloseAsync;
