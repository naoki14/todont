const UserModel = require('../Models/UserModel');
const argon2    = require('argon2');

class AuthController {
    constructor (dao) {
        this.UserModel = new UserModel(dao);
    }

    async register (username, password) {
        const passwordHash = await this.hashPassword(password);
        this.UserModel.addUser(username, passwordHash);
    }

    async hashPassword (password) {
        const hash = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16, // 2^16 MiB
            hashLength: 32,      // 32 byte hash (encoded in base64 so it's actually 1/3 longer)
            timeCost: 3,         // Takes ~220ms on our machines
            parallelism: 1,      // We have 1 core machines so we can't parallelize any more
        })
        return hash;
    }
}

module.exports = AuthController;