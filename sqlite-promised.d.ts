/// <reference path="typings/sqlite3/sqlite3.d.ts" />

declare module 'sqlite-promised' {
	interface IPromise<T> {
		then<N>(onFulfilled?: (result?: T) => N | IPromise<N>, onRejected?: (reason?) => any): IPromise<N>;
	}
	
	interface IStatementComposite<T> {
		statement: sqlite3.Statement;
		passedValue: T;
	}
	
	import sqlite3 = require('sqlite3');
		
	export function openDatabase(filePath: string): IPromise<sqlite3.Database>;
	export function closeDatabase<T>(db: sqlite3.Database, pass?: T): IPromise<T>;
	export function prepareStatement(db: sqlite3.Database, sql: string): IPromise<sqlite3.Statement>;
	export function finalizeStatement<T>(stmt: sqlite3.Statement, pass?: T): IPromise<T>;
	export function runStatement(stmt: sqlite3.Statement, params?: any): IPromise<sqlite3.Statement>;
	export function queryStatement<T>(stmt: sqlite3.Statement, params?: any): IPromise<IStatementComposite<T[]>>;
	export function runAndFinalize<T>(db: sqlite3.Database, sql: string, params?: any, pass?: T): IPromise<T>;
	export function runAndClose<T>(db: sqlite3.Database, sql: string, params?: any, pass?: T): IPromise<T>;
	export function queryAndFinalize<T>(db: sqlite3.Database, sql: string, params?: any): IPromise<T[]>;
	export function queryAndClose<T>(db: sqlite3.Database, sql: string, params?: any): IPromise<T[]>;
}