class UserModel {
    constructor (DAO) {
        this.DAO = DAO
    }
  
    createTable () {
        const sql = `
            CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            passwordHash TEXT
        )`
        return this.DAO.run(sql)
    }

    async addUser (username, passwordHash) {
        const sql = `INSERT INTO Users (username, passwordHash) VALUES (?, ?)`;
        // Username needs to be unique so this will throw an exception if we 
        // attempt to add a user that already exists
        await this.DAO.run(sql, [username, passwordHash]);
    }

    async getPasswordHash(username) {
        return this.DAO.all(
            `SELECT passwordHash FROM Users WHERE username = ?`,
            [username]
        );
    }
}

module.exports = UserModel;