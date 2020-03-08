class TodontModel {
    constructor (DAO) {
        this.DAO = DAO
    }
  
    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS todonts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT,
            priority TEXT
        )`
        return this.DAO.run(sql)
    }

    add (todont, priority) {
        return this.DAO.run(
            'INSERT INTO todonts (text, priority) VALUES (?, ?)',
            [todont, priority]
        );
    }
    
    getAll () {
        return this.DAO.all(
            'SELECT text, priority FROM todonts'
        );
    }

    getFiltered(priority){
        return this.DAO.all(
            'SELECT text, priority FROM todonts WHERE priority = (?)',
            [priority]
        );
    }
}
  
module.exports = TodontModel;