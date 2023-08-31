import mysql2 from "mysql2";

const connection = mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    multipleStatements: true,
    timezone: '+00:00'
})

connection.connect((connectionError) => {
    if(connectionError) return console.log(connectionError);

    connection.query("USE tododb", (error) => {
        if(error && error.code === "ER_BAD_DB_ERROR") {
            initializeDb();
        }
    });
})

function initializeDb(){
    console.log("initializeDB");
    
    const sql:string = `CREATE DATABASE tododb;
    USE tododb;
    CREATE TABLE users (id INT auto_increment PRIMARY KEY, username char(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL UNIQUE, password char(255) NOT NULL, role ENUM('USER', 'ADMIN') NOT NULL);
    CREATE TABLE todos (id INT auto_increment PRIMARY KEY, title char(255) NOT NULL, content char(255) NOT NULL, createdAt DATETIME NOT NULL, expiresAt DATETIME, state ENUM('NEW', 'UNFINISHED', 'EXPIRED', 'FINISHED') NOT NULL);
    CREATE TABLE usertodos (id INT auto_increment PRIMARY KEY, userID INT NOT NULL, FOREIGN KEY(userID) REFERENCES users(id), todoID INT NOT NULL, FOREIGN KEY(todoID) REFERENCES todos(id));
    CREATE TABLE settings (id INT auto_increment PRIMARY KEY, theme ENUM('DARK', 'LIGHT') NOT NULL, expireAutomatically BOOL NOT NULL, sendReminders BOOL NOT NULL, reminderInterval INT NOT NULL);
    CREATE TABLE usersettings (id INT auto_increment PRIMARY KEY, userID INT NOT NULL, FOREIGN KEY(userID) REFERENCES users(id), settingsID INT NOT NULL, FOREIGN KEY(settingsID) REFERENCES settings(id));`;
    connection.query(sql.split("\n").join(""), (error => {
        if(error){
            console.log(error);
        }
    }));
}

export default connection;